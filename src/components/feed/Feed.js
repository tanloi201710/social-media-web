import React from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './Feed.css';
import {Posts} from '../../dummyData';

export default function Feed() {
    // const [posts, setPosts] = useState([]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                    <Share/>
                    {Posts.map((p) => (
                        <Post key={p.id} post={p}/>
                    ))}
            </div>
        </div>
    )
}
