import { MoreVert } from '@material-ui/icons';
import React from 'react';
import './Post.css';
import {Users} from '../../dummyData';
import { useState } from 'react';

export default function Post({post}) {
    const [liked, setLiked] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler = () => {
        setLiked(isLiked ? liked-1 : liked+1);
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img 
                            className="postProfileImg" 
                            src={PF+Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                            alt=""
                        />
                        <span className="postUsername">
                            {Users.filter((u) => u.id === post?.userId)[0].username}
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.description}</span>
                    <img className="postImg" src={PF+post.photo} alt=""/>
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
                        <span className="postCommentText">{post.comment} bình luận </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
