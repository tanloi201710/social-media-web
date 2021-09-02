import { 
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel, 
} from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, getPosts } from '../../actions/post';
import { upload } from '../../api';
import './Share.css';

export default function Share() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };
        if(file !== null) {
            const data = new FormData();
            const fileName = Date.now()+'-'+file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                upload(data);
            } catch (error) {
                console.log(error);
            }
        }
        if(file === null && desc.current.value === '') {
            alert("You dont't have any picture or description to post");
        } else {
            dispatch(createPost(newPost,history));
            setFile(null);
            desc.current.value = '';
            dispatch(getPosts());
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={user.result.imageUrl ? user.result.imageUrl : PF+'person/defaultUser.jpg'}
                        alt=""
                    />
                    <input 
                        placeholder={`Bạn đang nghĩ gì vậy ${user.result.name}`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr"/>
                {
                    file && (
                        <div className="shareImgContainer">
                            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                            <Cancel color="secondary" className="shareCancelImg" onClick={() => setFile(null)} />
                        </div>
                    )
                }
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText"> Hình ảnh và Video</span>
                            <input 
                                style={{ display: 'none' }}
                                type="file"
                                name=""
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText"> Tag </span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText"> Check-in </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText"> Trạng thái </span>
                        </div>
                    </div>
                    <button className="shareButton">Đăng</button>
                </form>
            </div>
        </div>
    )
}
