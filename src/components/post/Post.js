import { ExpandMore, Favorite, MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
// import './Post.css';
import useStyles from './styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../actions/post';
import { Avatar, Card, CardActions, 
    CardContent, CardHeader, CardMedia, 
    Collapse, Divider, IconButton, 
    List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { storage, ref, deleteObject } from '../../firebase';
import { deleteImage } from '../../actions/images';

export default function Post({post}) {
    const [liked, setLiked] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isMoreBox,setIsMoreBox] = useState(false);
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const Users = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
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
            try {
                await deleteImage(post.imgName);
                dispatch(deletePost(post._id));
                setIsMoreBox(false);
            } catch (error) {
                console.log(error);
            }
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
                action={
                <IconButton aria-label="settings" className={classes.postTopRight} onClick={() => setIsMoreBox(!isMoreBox)}>
                    <MoreVert />
                    {
                        isMoreBox &&
                        <div className={classes.postTopRight_morevert}>
                            <List component="nav" aria-label="secondary action">
                                <ListItem
                                    button
                                    
                                >
                                <ListItemText primary="Edit" className={classes.actionText} />
                                </ListItem>
                                <Divider />
                                <ListItem
                                    button
                                    onClick={deleteHandler}
                                >
                                <ListItemText primary="Delete" className={classes.actionText} />
                                </ListItem>
                            </List>
                        </div>
                    }
                </IconButton>
                }
                title={Users.result.name}
                subheader={dateFormat(post.createdAt)}
            />
            <CardMedia
                className={classes.media}
                image={`${post.img}`}
                title={post.imgName}
            />
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
