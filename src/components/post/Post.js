import { 
    ExpandMore, Favorite, MoreVert, Delete, Edit 
} from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import useStyles from './styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../actions/post';
import { Avatar, Card, CardActions, 
    CardContent, CardHeader, 
    Collapse, Divider, IconButton, 
    List, ListItem, ListItemText, Typography} from '@material-ui/core';
import { deleteImage } from '../../actions/images';
import ImagesList from '../imageList/ImagesList';
import { CircularProgress, TextField } from '@mui/material';

export default function Post({post}) {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [liked, setLiked] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(user.result._id));
    const [isMoreBox,setIsMoreBox] = useState(false);
    const dispatch = useDispatch();
    const {deleting} = useSelector(state => state.posts);
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const likeHandler = () => {
        setLiked(isLiked ? liked-1 : liked+1);
        setIsLiked(!isLiked);
        dispatch(likePost(post._id));
    };

    const deleteHandler = async() => {
        if(post?.img) {
            for (let i = 0; i < post.imgName.length; i++) {
                try {
                    await deleteImage(post.imgName[i]);
                } catch (error) {
                    console.log(error);
                }
            }
            dispatch(deletePost(post._id));
            setIsMoreBox(false);
        } else {
            dispatch(deletePost(post._id));
        }
    };

    const dateFormat = (timestamps) => {
        const created_date = new Date(timestamps);

        const now = new Date(Date.now());
        
        const yearsAgo = now.getFullYear() - created_date.getFullYear();
        const monthsAgo = now.getMonth() - created_date.getMonth();
        const daysAgo = now.getDate() - created_date.getDate();
        const hoursAgo = now.getHours() - created_date.getHours();
        const minsAgo = now.getMinutes() - created_date.getMinutes();

        if(yearsAgo > 0) {
            return `${yearsAgo} năm trước`;
        } else if(monthsAgo > 0) {
            return `${monthsAgo} tháng trước`;
        } else if(daysAgo > 0) {
            return `${daysAgo} ngày trước`;
        } else if(hoursAgo > 0) {
            return `${hoursAgo} giờ trước`;
        } else if(minsAgo > 0) {
            return `${minsAgo} phút trước`;
        } else {
            return 'Vừa xong';
        }
    };

    return (

        <Card className={classes.root} raised>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={user.result.profilePicture}>
                        { user?.result.name.charAt(0).toUpperCase() }
                    </Avatar>
                }
                title={<div className={classes.name}>{user.result.name}</div>}
                subheader={dateFormat(post.createdAt)}
                action={
                    <IconButton aria-label="settings" className={classes.postTopRight} onClick={() => setIsMoreBox(!isMoreBox)}>
                        { deleting ? <CircularProgress size={22} /> : <MoreVert />}
                        {
                            isMoreBox &&
                            <div className={classes.postTopRight_morevert}>
                                <List component="nav" aria-label="secondary action">
                                    <ListItem
                                        button
                                    >
                                        <Edit fontSize="large"/>
                                        <ListItemText primary="Chỉnh sửa bài viết" className={classes.actionText} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem
                                        button
                                        onClick={deleteHandler}
                                    >
                                        <Delete fontSize="large"/>
                                        <ListItemText primary="Xóa bài viết" className={classes.actionText} />
                                    </ListItem>
                                </List>
                            </div>
                        }
                    </IconButton>
                }
            />
            {/* <CardMedia
                className={classes.media}
                image={`${post.img}`}
                title={post.imgName}
            /> */}
            {
                post.img.length > 1 ? <ImagesList arrObj={post.img}  /> : post.img.length !== 0 &&
                <img src={post.img} alt={post.imgName} className={classes.media} />
            }
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.description}>
                    {post.desc}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like" onClick={likeHandler}>
                    {isLiked ? <Favorite color="secondary" className={classes.favorite} /> : <Favorite />}
                </IconButton>
                <Typography color="textSecondary">{liked}</Typography>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <TextField label="Viết bình luận..." variant="standard" fullWidth />
                    <div className={classes.headCmtWrap}>
                        <Avatar className={classes.cmtAvt} src="https://scontent.fsgn9-1.fna.fbcdn.net/v/t1.6435-1/p100x100/83674931_609441372959148_1761968762195542016_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qgeCRr0oFHAAX_jZdSM&_nc_ad=z-m&_nc_cid=1487&_nc_ht=scontent.fsgn9-1.fna&oh=b7ec3247d2811106d1b6618d49c7ac28&oe=61736C04"></Avatar>
                        <div className={classes.cmtMain}>
                            <Typography variant="subtitle2" component="span">User Name</Typography>
                            <Typography color="textSecondary" className={classes.cmtTime} component="span">Created At</Typography>
                            <Typography className={classes.cmtContent} variant="body2" component="div">
                                Tối ngày đăng ảnh xàm xí đú.
                            </Typography>
                        </div>
                    </div>
                        
                </CardContent>
            </Collapse>
            </Card>
    )
}
