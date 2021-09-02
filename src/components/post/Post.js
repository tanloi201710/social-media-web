import { MoreVert } from '@material-ui/icons';
import React from 'react';
import './Post.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, getPosts, likePost } from '../../actions/post';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';

export default function Post({post}) {
    const [liked, setLiked] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isMoreBox,setIsMoreBox] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const Users = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const likeHandler = () => {
        setLiked(isLiked ? liked-1 : liked+1);
        setIsLiked(!isLiked);
        dispatch(likePost(post._id));
    };

    const deleteHandler = () => {
        dispatch(deletePost(post._id));
        setIsMoreBox(false);
        dispatch(getPosts());
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img 
                            className="postProfileImg" 
                            src={Users.result.imageUrl}
                            alt=""
                        />
                        <span className="postUsername">
                            {Users.result.name}
                        </span>
                        <span className="postDate">Vài phút trước</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className="postTopRight-icon" onClick={() => setIsMoreBox(!isMoreBox)} />
                        {
                            isMoreBox &&
                            <div className="postTopRight-morevert">
                                <List component="nav" aria-label="secondary mailbox folder">
                                    <ListItem
                                    button
                                    >
                                    <ListItemText primary="Edit" />
                                    </ListItem>
                                    <Divider />
                                    <ListItem
                                    button
                                    >
                                    <ListItemText primary="Delete" onClick={deleteHandler} />
                                    </ListItem>
                                </List>
                            </div>
                        }
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={'https://social-api-ct466.herokuapp.com/images/'+post?.img} alt=""/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img 
                            className="likeIcon" 
                            src={`${PF}like.png`}
                            onClick={likeHandler}
                            alt=""/>
                        <img 
                            className="likeIcon" 
                            src={`${PF}heart.png`} 
                            onClick={likeHandler}
                            alt=""/>
                        <span className="postLikeCouter">{liked} người thích</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post?.comments?.length || 0} bình luận </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
