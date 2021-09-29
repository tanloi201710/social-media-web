import React from 'react';
import './CloseFriend.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CloseFriend({user}) {
    return (
        <Link to={`/profile/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <li className="sidebarFriend">
                <Avatar className="sidebarFriendImg" src={user?.profilePicture}></Avatar>
                <span className="sidebarFriendName">{user.name}</span>
            </li>
        </Link>
    )
}
