import { 
    PermMedia,
    Label,
    Room,
    Cancel, 
} from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { createPost, getPosts } from '../../actions/post';
import './Share.css';
import { CircularProgress, Avatar } from '@material-ui/core';
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../../firebase';

export default function Share() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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

    const compressFile = async(file) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
        console.log(error);
        }
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

            const metadata = {
                contentType: compressedFile.type
            };

            const fileName = Date.now()+ '-' + compressedFile.name;
    
            const storageRef = ref(storage, 'images/' + fileName);

            newPost.imgName = fileName;
    
            const uploadTask = uploadBytesResumable(storageRef, compressedFile, metadata);
    
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                    console.log(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        newPost.img = url;
                        if(newPost.img === '' && newPost.desc === '') {
                            alert("You dont't have any picture or description to post");
                        } else {
                            dispatch(createPost(newPost,history));
                            resetForm();
                            setFile(null);
                        }
                    });
                }
            );
        };
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    {/* <img 
                        className="shareProfileImg" 
                        src={user.result.profilePicture ? user.result.profilePicture : PF+'person/defaultUser.jpg'}
                        alt=""
                    /> */}
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
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText"> Hình ảnh và Video</span>
                            <div style={{ display: 'none' }}>
                                <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText"> Tag </span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText"> Check-in </span>
                        </div>
                        {/* <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText"> Trạng thái </span>
                        </div> */}
                    </div>
                    <button className="shareButton">{creating ? <CircularProgress size={18} color="secondary" /> : "Đăng"}</button>
                </form>
            </div>
        </div>
    )
}
