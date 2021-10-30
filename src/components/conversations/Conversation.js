import React, { useEffect, useState } from 'react';
import './Conversation.css';
import { getUser } from '../../api';

export default function Conversation({ conversation, currentUser }) {
    const [user,setUser] = useState({});

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getFriend = async () => {
            try {
                const res = await getUser(friendId);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFriend();

        return () => {
            setUser({});
        }
    }, [conversation, currentUser._id]);
    return (
        <div className="conversation">
            <img 
                className="conversationImg" 
                src={user?.profilePicture}
                alt=""
            />
            <span className="conversationName">{user.name}</span>
        </div>
    )
}
