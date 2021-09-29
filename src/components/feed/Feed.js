import React, { useEffect } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './Feed.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getTimeLine } from '../../actions/post';
import { CircularProgress } from '@material-ui/core';

export default function Feed({user}) {
    const dispatch = useDispatch();
    const{ posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        if(user) {
            dispatch(getPosts(user));
        } else {
            console.log("call in feed");
            dispatch(getTimeLine());
        }
    }, [dispatch,user]);

    // const reloadProfile = () => {
    //     console.log("recall reload");
    //     dispatch(getPosts(user));
    // }

    if(!posts.length && !isLoading) return (
        <div className="feed" style={{marginBottom: 'auto'}}>
            <div className="feedWrapper">
                    <Share />
                    <div className="feedNotPost">
                        <h4>Bạn chưa có bài viết !!!</h4>
                        <h4>Bạn hãy chia sẽ các bài viết của mình !!!</h4>
                    </div>
            </div>
        </div>
    )
    return (
        <div className="feed" style={{marginBottom: 'auto'}}>
            <div className="feedWrapper">
                    <Share id={user} />
                    {
                        !isLoading ? 
                            posts.map((p) => (
                                <div className="postWrapper" key={p._id}>
                                    <Post post={p}/>
                                </div>
                            )) : <div className="progress-circle" ><CircularProgress /> </div>
                    }
            </div>
        </div>
    )
}
