import { 
    PermMedia,
    LocalOffer,
    Cancel, 
    InsertEmoticon 
} from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, getPosts } from '../../actions/post';
import './Share.css';
import { CircularProgress, Avatar } from '@material-ui/core';
import { compressFile, uploadFireBase } from '../../actions/images';

export default function Share() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [file,setFile] = useState(null);
    const desc = useRef();
    

    const { creating } = useSelector((state) => state.posts);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(!creating) {
            dispatch(getPosts());
        }
    }, [dispatch,creating]);

    const resetForm = () => {
        desc.current.value = '';
        setFile(null);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            userId: user?._id || user?.googleId,
            desc: desc.current.value,
            img: '',
            imgName: ''
        };

        if(file) {
            const compressedFile = await compressFile(file);
            const fileName = Date.now()+ '-' + compressedFile.name;
            newPost.imgName = fileName;
            const url = await uploadFireBase(compressedFile,fileName);
            newPost.img = url;
        };
        if(newPost.img === '' && newPost.desc === '') {
            alert("You dont't have any picture or description to post");
        } else {
            dispatch(createPost(newPost,history));
            resetForm();
            setFile(null);
        }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Avatar className="shareProfileImg" src={user.result.profilePicture}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
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
                            <PermMedia htmlColor="tomato" fontSize="large" className="shareIcon" />
                            <span className="shareOptionText"> Ảnh/Video</span>
                            <div style={{ display: 'none' }}>
                                <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                        </label>
                        <div className="shareOption">
                            <LocalOffer htmlColor="blue" fontSize="large" className="shareIcon" />
                            <span className="shareOptionText"> Gắn thẻ bạn bè </span>
                        </div>
                        <div className="shareOption">
                            <InsertEmoticon htmlColor="orange" fontSize="large" className="shareIcon" />
                            <span className="shareOptionText"> Cảm súc </span>
                        </div>
                    </div>
                    <button className="shareButton">{creating ? <CircularProgress size={18} /> : "Đăng"}</button>
                </form>
            </div>
        </div>
    )
}
