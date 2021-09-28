import { 
    ExpandMore, Favorite, MoreVert, Delete, Edit 
} from '@material-ui/icons';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import useStyles from './styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, updateComments } from '../../actions/post';
import { Avatar, Card, CardActions, 
    CardContent, CardHeader, 
    Collapse, Divider, IconButton, 
    List, ListItem, ListItemText, Typography} from '@material-ui/core';
import { deleteImage } from '../../actions/images';
import ImagesList from '../imageList/ImagesList';
import { CircularProgress, TextField } from '@mui/material';
import { Comment } from '@mui/icons-material';
import CommentComponent from '../comment/CommentComponent';
import { dateFormat } from '../../actions/format';
import { getUser } from '../../api';

export default function Post({post}) {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [currentPost, setCurrentPost] = useState(post);
    const [userPost,setUserPost] = useState();

    const [liked, setLiked] = useState(post.likes.length);
    const [commented, setCommented] = useState(currentPost.comments.length);
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState(currentPost.likes.includes(user.result._id));
    const [isMoreBox,setIsMoreBox] = useState(false);
    const dispatch = useDispatch();
    const {deleting} = useSelector(state => state.posts);
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const {posts} = useSelector((state) => state.posts);
    
    useEffect(() => {
        const getUserPost = async () => {
            try {
                const user = await getUser(post.userId);
                setUserPost(user.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUserPost();
    }, [post]);

    useEffect(() => {
        posts.forEach(post => {
            if(post._id === currentPost._id) {
                setCurrentPost(post);
            }
        });
        setCommented(currentPost.comments.length);
    }, [posts,currentPost])
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const likeHandler = () => {
        setLiked(isLiked ? liked-1 : liked+1);
        setIsLiked(!isLiked);
        dispatch(likePost(currentPost._id));
    };

    const deleteHandler = async() => {
        if(currentPost?.img) {
            for (let i = 0; i < currentPost.imgName.length; i++) {
                try {
                    await deleteImage(currentPost.imgName[i]);
                } catch (error) {
                    console.log(error);
                }
            }
            dispatch(deletePost(currentPost._id));
            setIsMoreBox(false);
        } else {
            dispatch(deletePost(currentPost._id));
        }
    };


    const handleComment = () => {
        const commentForm = {
            img: user.result?.profilePicture,
            name: user.result.name,
            message: comment,
            likes: [],
            createdAt: Date.now()
        }
        setComment('');
        currentPost.comments.unshift(commentForm);
        dispatch(updateComments(currentPost._id,currentPost.comments));
    }


    return (

        <Card className={classes.root} raised>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={userPost?.profilePicture}>
                        { userPost?.name.charAt(0).toUpperCase() }
                    </Avatar>
                }
                title={<div className={classes.name}>{userPost?.name}</div>}
                subheader={dateFormat(currentPost.createdAt)}
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
                currentPost.img.length > 1 ? <ImagesList arrObj={currentPost.img}  /> : currentPost.img.length !== 0 &&
                <img src={currentPost.img} alt={currentPost.imgName} className={classes.media} />
            }
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.description}>
                    {currentPost.desc}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like" onClick={likeHandler}>
                    {isLiked ? <Favorite color="secondary" className={classes.favorite} /> : <Favorite />}
                </IconButton>
                <Typography color="textSecondary">{liked}</Typography>
                
                <Comment className={classes.cmtButton} color="primary" onClick={handleExpandClick} style={{ cursor: 'pointer' }} />
                
                <Typography color="textSecondary">{commented}</Typography>
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
                    <TextField 
                        label="Viết bình luận..." 
                        variant="standard" 
                        fullWidth 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') handleComment() }}
                    />
                    {
                        currentPost.comments.length > 0 && 
                        currentPost.comments.map((comment,index) => (
                            <CommentComponent comment={comment} key={index} />
                        ))
                    }
                    
                </CardContent>
            </Collapse>
            </Card>
    )
}
