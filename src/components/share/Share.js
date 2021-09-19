import { 
    PermMedia,
    LocalOffer,
    Cancel, 
    InsertEmoticon 
} from '@material-ui/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, getPosts } from '../../actions/post';
import './Share.css';
import { CircularProgress, Avatar, Button, makeStyles } from '@material-ui/core';
import { ImageList, ImageListItem } from '@mui/material';
import { compressFile, uploadFireBase } from '../../actions/images';
import { END_UPLOADING, START_UPLOADING } from '../../constants/actionTypes';

export default function Share() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [files,setFiles] = useState([]);
    const [arrObj,setArrObj] = useState([]);
    const desc = useRef();
    

    const { creating } = useSelector((state) => state.posts);
    const { isUploading } = useSelector((state) => state.upload);

    const dispatch = useDispatch();
    const history = useHistory();
    console.log(arrObj);

    useEffect(() => {
        if(!creating) {
            dispatch(getPosts());
        }
    }, [dispatch,creating]);

    const useStyles = makeStyles(() => ({
        progress_white: {
            color: '#fff'
        }
    }));

    const classes = useStyles();

    const setItemData = useCallback((files) => {
        const itemData = [];
        for (let i = 0; i < files.length; i++) {
            const obj = {
                img: URL.createObjectURL(files[i]),
            };
            if(i===0) {
                const img = new Image();
                img.onload = () => {
                    obj.cols = (img.width / img.height) < 1 ? 2 : 3;
                    obj.rows = obj.cols === 2 ? 3 : 2
                };
                img.src = URL.createObjectURL(files[i]);
                itemData.push(obj);
            } else {
                itemData.push(obj);
            }
        }
        // setArrObj(itemData);
        return itemData;
    },[]);
    useEffect(() => {
        setArrObj(() => setItemData(files));
    },[files,setItemData,setArrObj]);

    

    const resetForm = () => {
        desc.current.value = '';
        setFiles([]);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            userId: user?._id || user?.googleId,
            desc: desc.current.value,
            img: [],
            imgName: []
        };

        if(files.length > 0) {
            if(files.length === 1) {
                const compressedFile = await compressFile(files[0]);
                const fileName = Date.now()+ '-' + compressedFile.name;
                newPost.imgName.push(fileName);
                dispatch({type: START_UPLOADING});
                const url = await uploadFireBase(compressedFile,fileName);
                dispatch({type: END_UPLOADING});
                newPost.img.push(url);
            } else {
                const compressfileList = [];
                dispatch({type: START_UPLOADING});
                for (let i = 0; i < files.length; i++) {
                    const compressedFile = await compressFile(files[i]);
                    compressfileList.push(compressedFile);
                    const fileName = Date.now()+ '-' + compressedFile.name;
                    newPost.imgName.push(fileName);
                    const url = await uploadFireBase(compressedFile,fileName);
                    newPost.img.push(url);
                }
                dispatch({type: END_UPLOADING});
                let i =0;
                arrObj.forEach((item) => {
                    item.img = newPost.img[i];
                    i++;
                });
                newPost.img = arrObj;
            }
        };
        if(newPost.img === '' && newPost.desc === '') {
            alert("You dont't have any picture or description to post");
        } else {
            dispatch(createPost(newPost,history));
            resetForm();
        }
    };


    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Avatar className="shareProfileImg" src={user.result?.profilePicture}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
                    <input 
                        placeholder={`Bạn đang nghĩ gì vậy ${user.result.name}`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <div className="shareHr"></div>
                {
                    files.length > 0 && (
                        <div className="shareImgContainer">
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                                overflow: 'hidden'
                            }}>
                                <ImageList 
                                    cols={3} 
                                    rowHeight={160}
                                    style={{ width: 500 }}
                                >
                                    {arrObj && arrObj.map((item) => (
                                    <ImageListItem key={item.img} cols={1} rows={1}>
                                        <img 
                                            src={item.img} 
                                            alt="" 
                                            loading="lazy"
                                            style={{ height: 160 }}
                                        />
                                    </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                            <Cancel color="secondary" className="shareCancelImg" onClick={() => setFiles([])} />
                        </div>
                    )
                }
                <form className="shareBottom">
                    <div className="shareOptions">
                        <label className="shareOption">
                            <PermMedia htmlColor="tomato" fontSize="medium" className="shareIcon" />
                            <span className="shareOptionText"> Ảnh/Video</span>
                            <div style={{ display: 'none' }}>
                                <input id="file" type="file" multiple onChange={(e) => setFiles(e.target.files)} />
                            </div>
                        </label>
                        <div className="shareOption">
                            <LocalOffer htmlColor="blue" fontSize="medium" className="shareIcon" />
                            <span className="shareOptionText"> Gắn thẻ bạn bè </span>
                        </div>
                        <div className="shareOption">
                            <InsertEmoticon htmlColor="orange" fontSize="medium" className="shareIcon" />
                            <span className="shareOptionText"> Cảm xúc </span>
                        </div>
                    </div>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {creating || isUploading ? <CircularProgress size={22} classes={{colorPrimary: classes.progress_white}} /> : "Đăng"}
                    </Button>
                    {/* <button className="shareButton"></button> */}
                </form>
            </div>
        </div>
    )
}
