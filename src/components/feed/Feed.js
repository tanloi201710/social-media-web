import React, { useEffect } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './Feed.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import { CircularProgress } from '@material-ui/core';

export default function Feed() {
    const dispatch = useDispatch();
    const{ posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch,posts.length]);

    if(!posts.length && !isLoading) return (
        <div className="feed" style={{marginBottom: 'auto'}}>
            <div className="feedWrapper">
                    <Share />
                    <div>
                        <h4>Không có post - Hiển thị một cái Post Demo nào đó</h4>
                    </div>
            </div>
        </div>
    )
    return (
        <div className="feed" style={{marginBottom: 'auto'}}>
            <div className="feedWrapper">
                    <Share/>
                    {
                        !isLoading ? 
                            posts.map((p) => (
                                <div className="postWrapper">
                                    <Post key={p._id} post={p}/>
                                </div>
                            )) : <div className="progress-circle" ><CircularProgress /> </div>
                    }
            </div>
        </div>
    )
}
