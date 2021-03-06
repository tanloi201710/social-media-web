import { 
    PermMedia, LocalOffer, Cancel, Search, 
} from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, getTimeLine, getPosts } from '../../actions/post';
import './Share.css';
import { 
    CircularProgress, Avatar, Button, DialogActions, 
    DialogContent, DialogTitle, Dialog, Grid, Paper, Chip, ListItemIcon,
    ImageList, ImageListItem
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Emojify from 'react-emojione';
import { compressFile, uploadFireBase } from '../../actions/images';
import { END_UPLOADING, START_UPLOADING } from '../../constants/actionTypes';
import '../sidebar/Sidebar';
import { addNotification } from '../../actions/notifications';

export default function Share({id}) {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [files,setFiles] = useState([]);
    const [arrObj,setArrObj] = useState([]);
    const desc = useRef();

    const { creating } = useSelector((state) => state.posts);
    const { isUploading } = useSelector((state) => state.upload);
    const { friends } = useSelector((state) => state.user);
    const { savedSocket } = useSelector((state) => state.socket);
    
    const [feel, setFeel] = useState('');
    const [tag,setTag] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(creating) {
            if(id) {
                dispatch(getPosts(id))
            } else {
                console.log("call in share");
                dispatch(getTimeLine());
            }
        }
    }, [dispatch,creating,id]);

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
        setFiles([]);
        desc.current.value = '';
        setFeel('');
        setTag([]);
        setChipData([]);
    };
    

    const handleSubmit = async(e) => {
        e.preventDefault();

        const waitToken = Date.now().toString();

        savedSocket.current.emit('friendsTag', {
            senderId: user.result._id,
            receiverId: tag,
            waitToken
        });

        tag.forEach(one => {
            const model = {
                sender: user.result._id,
                receiver: one,
                action: '???? tri???u h???i b???n trong m???t b??i vi???t ???????????',
                type: 'post',
                waitToken,
            }
            dispatch(addNotification(model));
        })

        const newPost = {
            userId: user?._id || user?.googleId,
            desc: desc.current.value,
            feeling: feel,
            tag: chipData,
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

    const [chipData, setChipData] = React.useState([]);

    const addChipData = (user) => {
        setChipData([...chipData, { key: user._id, label: user.name }]);
        setTag([...tag,user._id]);
    }
    
    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
        setTag((tags) => tags.filter((tag) => tag !== chipToDelete.key ));
    };

    useEffect(() => {
        setFeel(feel);
        console.log(feel);
        return () => {}
    },[feel]);

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Avatar className="shareProfileImg" src={user.result?.profilePicture}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
                    <div className="shareTopTitle">
                        <div className="shareTopTitleFeel">
                            {feel === '' ? feel : 
                                <>{user.result.name} <span> ??ang c???m th???y <Emojify style={{width: '20px', height: '20px'}}>{feel}</Emojify></span></>
                            }
                            {chipData.length > 0 && (
                                <><br/> <span style={{wordWrap: 'break-word'}}>c??ng v???i {
                                    chipData.slice(0,2).map((chip) => (<strong style={{color: '#2e81f4'}}>@{chip.label}  </strong>))
                                }
                                    </span>
                                    <br/>
                                    <span>
                                        {
                                        chipData.slice(2,chipData.length).map((chip) => (<strong style={{color: '#2e81f4'}}>@{chip.label}  </strong>))
                                        }
                                    </span>
                                </>
                            )}
                        </div>
                        <input 
                            placeholder={`B???n ??ang ngh?? g?? v???y ${user.result.name} ?`}
                            className="shareInput"
                            ref={desc}
                        /> 
                    </div>

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
                            <PermMedia htmlColor="tomato" fontSize="large" className="shareIcon" />
                            <span className="shareOptionText"> ???nh</span>
                            <div style={{ display: 'none' }}>
                                <input id="file" type="file" multiple onChange={(e) => setFiles(e.target.files)} />
                            </div>
                        </label>
                        <div className="shareOption" onClick={() => setOpenTag(true)}>
                            <LocalOffer htmlColor="blue" fontSize="large" className="shareIcon" />
                            <span className="shareOptionText"> G???n th??? b???n b?? </span>
                        </div>
                        <div className="shareOption" onClick={() => setOpenFeel(true)}>
                            {/* <InsertEmoticon htmlColor="orange" fontSize="medium" className="shareIcon" /> */}
                            <Emojify className="shareEmoji" >????</Emojify>
                            <span className="shareOptionText"> C???m x??c </span>
                        </div>
                    </div>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {creating || isUploading ? <CircularProgress size={22} classes={{colorPrimary: classes.progress_white}} /> : "????ng"}
                    </Button>
                    <div >
                        <Dialog className="shareFeeling" open={openFeel} onClose={() => setOpenFeel(false)}>
                            <DialogTitle className="shareFeelingTitle"> B???n ??ang c???m th???y {feel === '' ? 'nh?? th??? n??o ?' : <Emojify>{feel}</Emojify>}</DialogTitle>
                            <hr/>
                            <DialogContent>
                                <div className="shareFeelingContent">
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? h???nh ph??c`)}>
                                                <Emojify><span className="shareFeelingOptionIcon">???? H???nh ph??c</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? ????ng y??u`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? ????ng y??u</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? ng???c nhi??n`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? Ng???c nhi??n</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? h??i h?????c`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? H??i h?????c</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? bu???n ng???`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? Bu???n ng???</span></Emojify>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? tuy???t v???i`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? Tuy???t v???i</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`?????? bu???n`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >?????? Bu???n</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? vui v???`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? Vui v???</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? th?? gi??n`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? Th?? gi??n</span></Emojify>
                                            </div>
                                            <div className="shareFeelingOption" onClick={() => setFeel(`???? tho???i m??i`)}>
                                                <Emojify><span className="shareFeelingOptionIcon" >???? Tho???i m??i</span></Emojify>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </DialogContent>
                            <hr/>
                            <DialogActions>
                                <Button onClick={() => {setFeel(''); setOpenFeel(false)}} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={() => setOpenFeel(false)} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog className="shareTag" open={openTag} onClose={() => setOpenTag(false)}>
                            <DialogTitle className="shareTagTitle">
                                G???n th??? b???n b??
                            </DialogTitle>
                            <hr/>
                            <DialogContent>
                                <div className="shareTagsearch">
                                    <ListItemIcon>
                                        <Search fontSize="medium" className="shareTagsearchIcon"/>
                                    </ListItemIcon>
                                    <input placeholder="T??m ki???m b???n b?? ..." className="shareTagsearchInput" />
                                </div>
                                <div className="shareTagsFriended">
                                    <span className="shareTagsFriendTitle">???? g???n th???</span>
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
                                    <span className="shareTagsFriendTitle">G???i ??</span>
                                    <Grid container spacing={2} className="shareTagContentOption">
                                        <Grid item xs={12} md={12}>
                                            <ul className="shareFriendList">
                                                {friends.map((u,index) => (
                                                    <li className="shareFriend" key={index} onClick={() => addChipData(u)}>
                                                        <Avatar className="shareFriendImg" src={u?.profilePicture}></Avatar>
                                                        <span className="shareFriendName">{u.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </div>
                            </DialogContent>
                            <hr/>
                            <DialogActions>
                                <Button onClick={() => { setOpenTag(false); setChipData([]); setTag([]); }} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={() => setOpenTag(false)} color="primary">
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
