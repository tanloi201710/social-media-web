import { ExpandMore, Favorite, MoreVert, Delete, Edit } from '@material-ui/icons';
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
import { CircularProgress } from '@mui/material';

export default function Post({post}) {
    const [liked, setLiked] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isMoreBox,setIsMoreBox] = useState(false);
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const Users = JSON.parse(localStorage.getItem('profile'));
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
                    <Avatar aria-label="recipe" className={classes.avatar} src={Users.result.profilePicture}>
                        { Users?.result.name.charAt(0).toUpperCase() }
                    </Avatar>
                }
                title={Users.result.name}
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
                <Typography variant="body2" color="textPrimary" component="p">
                    {post.desc}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like" onClick={likeHandler}>
                    <Favorite />
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
                <Typography paragraph>Comments:</Typography>
                <Typography paragraph>
                    Comming soon!
                </Typography>
                </CardContent>
            </Collapse>
            </Card>
    )
}
