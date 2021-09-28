import { 
    PermMedia, LocalOffer, Cancel, InsertEmoticon, Search, 
    // ChevronRight, ChevronLeft
} from '@material-ui/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, getTimeLine } from '../../actions/post';
import './Share.css';
import { 
    CircularProgress, Avatar, Button, makeStyles, DialogActions, 
    DialogContent, DialogTitle, Dialog, Grid, Paper, Chip, ListItemIcon, 
    // IconButton,
} from '@material-ui/core';
import Emojify from 'react-emojione';
import CloseFriend from '../closeFriend/CloseFriend';
import {Users} from '../../dummyData';
import { compressFile, uploadFireBase } from '../../actions/images';
import { ImageList, ImageListItem } from '@mui/material';
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

    useEffect(() => {
        if(creating) {
            dispatch(getTimeLine());
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
    const [openFeel, setOpenFeel] = React.useState(false);
    const [openTag, setOpenTag] = React.useState(false);

    const handleClickOpenFeeling = () => {
        setOpenFeel(true)
    };

    const handleClickOpenTag = () => {
        setOpenTag(true);
    };

    const handleClose = () => {
        setOpenFeel(false);
        setOpenTag(false);
    };

    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Mark Zuckerberg' },
        { key: 1, label: 'Polymer' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);
    
    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
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
                        <div className="shareOption" onClick={handleClickOpenTag}>
                            <LocalOffer htmlColor="blue" fontSize="medium" className="shareIcon" />
                            <span className="shareOptionText"> Gắn thẻ bạn bè </span>
                        </div>
                        <div className="shareOption" onClick={handleClickOpenFeeling}>
                            <InsertEmoticon htmlColor="orange" fontSize="medium" className="shareIcon" />
                            <span className="shareOptionText"> Cảm xúc </span>
                        </div>
                    </div>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {creating || isUploading ? <CircularProgress size={22} classes={{colorPrimary: classes.progress_white}} /> : "Đăng"}
                    </Button>
                    <div >
                        <Dialog className="shareFeeling" open={openFeel} onClose={handleClose}>
                            <DialogTitle className="shareFeelingTitle">
                                {/* <IconButton className="shareFeelingButtonLeft" onClick={handleClickOpenTag}>
                                    <ChevronLeft fontSize="large" className="shareTagIconLeft"/>
                                </IconButton> */}
                                Bạn đang cảm thấy như thế nào ?
                            </DialogTitle>
                            <hr/>
                            <DialogContent>
                                <div className="shareFeelingContent">
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <div className="shareFeelingOption">
                                                <Emojify><span className="shareFeelingOptionIcon">😊 Hạnh phúc</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Hạnh phúc </span> */}
                                            </div>
                                            <div className="shareFeelingOption">
                                                <Emojify><span className="shareFeelingOptionIcon" >😍 Đáng yêu</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Đáng yêu </span> */}
                                            </div>
                                            <div className="shareFeelingOption">
                                                <Emojify><span className="shareFeelingOptionIcon" >😲 Ngạc nhiên</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Ngạc nhiên </span> */}
                                            </div>
                                            <div className="shareFeelingOption">
                                                <Emojify><span className="shareFeelingOptionIcon" >🤪 Hài hước</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Hài hước </span> */}
                                            </div>
                                            <div className="shareFeelingOption">
                                                <Emojify><span className="shareFeelingOptionIcon" >😪 Buồn ngủ</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Buồn ngủ </span> */}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="shareFeelingOption">
                                                <Emojify><span className="shareFeelingOptionIcon" >😀 Tuyệt vời</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Tuyệt vời </span> */}
                                            </div>
                                            <div className="shareFeelingOption">
                                                <Emojify><span className="shareFeelingOptionIcon" >☹️ Buồn</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Buồn </span> */}
                                            </div>
                                            <div className="shareFeelingOption" >
                                                <Emojify><span className="shareFeelingOptionIcon" >😆 Vui vẻ</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Vui vẻ </span> */}
                                            </div>
                                            <div className="shareFeelingOption" >
                                                <Emojify><span className="shareFeelingOptionIcon" >😌 Thư giãn</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Thư giãn </span> */}
                                            </div>
                                            <div className="shareFeelingOption" >
                                                <Emojify><span className="shareFeelingOptionIcon" >😇 Thoải mái</span></Emojify>
                                                {/* <span className="shareFeelingOptionText" > Thoải mái </span> */}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </DialogContent>
                            <hr/>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>


                        <Dialog className="shareTag" open={openTag} onClose={handleClose}>
                            <DialogTitle className="shareTagTitle">
                                {/* <IconButton className="shareTagButtonLeft" >
                                        <ChevronLeft fontSize="large" className="shareTagIconLeft"/>
                                </IconButton> */}
                                Gắn thẻ bạn bè
                                {/* <IconButton className="shareTagButtonRight" onClick={handleClickOpenFeeling}>
                                    <ChevronRight fontSize="large" className="shareTagIconRight"/>
                                </IconButton> */}
                            </DialogTitle>
                            <hr/>
                            <DialogContent>
                                <div className="shareTagsearch">
                                    <ListItemIcon>
                                        <Search fontSize="medium" className="shareTagsearchIcon"/>
                                    </ListItemIcon>
                                    <input placeholder="Tìm kiếm bạn bè ..." className="shareTagsearchInput" />
                                </div>
                                <div className="shareTagsFriended">
                                    <span className="shareTagsFriendTitle">Đã gắn thẻ</span>
                                    <Paper
                                        className="shareTagsFriendNameBox"
                                        // sx={{ p: 1, m: 1, }}
                                        elevation={3}
                                        component="ul"
                                    >
                                        {chipData.map(u => {
                                            let icon;
                                            return (
                                                <li key={u.key}  className="shareTagsFriendNameLi">
                                                    <Chip
                                                        className="shareTagsFriendNameChip"
                                                        icon={icon}
                                                        label={u.label}
                                                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                                        onDelete={u.label === 'React' ? handleDelete(u) : handleDelete(u)}
                                                    />
                                                </li>
                                            );
                                        })}
                                    </Paper>
                                </div>
                                <div className="shareTagContent">
                                    <span className="shareTagsFriendTitle">Gợi ý</span>
                                    <Grid container spacing={2} className="shareTagContentOption">
                                        <Grid item xs={12} md={12}>
                                            {Users.map(u => (
                                                <CloseFriend key={u.id} user={u}/>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </div>
                            </DialogContent>
                            <hr/>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </form>
            </div>
        </div>
    )
}
