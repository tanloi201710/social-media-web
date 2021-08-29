import React from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './Feed.css';
import { useSelector } from 'react-redux';

export default function Feed() {

    const{ posts }= useSelector((state) => state.posts);
    return (
        <div className="feed" style={{marginBottom: 'auto'}}>
            <div className="feedWrapper">
                    <Share/>
                    {
                        posts.length > 0 ? 
                            posts.map((p) => (
                            <Post key={p._id} post={p}/>
                            )) :
                        (
                            <div>
                                <h4>Không có post - Hiển thị một cái Post Demo nào đó</h4>
                            </div>
                        )
                    }
            </div>
        </div>
    )
}
