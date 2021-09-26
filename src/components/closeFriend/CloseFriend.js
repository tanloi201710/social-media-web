import React from 'react';
import './CloseFriend.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CloseFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <Link to={`/profile/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <li className="sidebarFriend">
                <Avatar className="sidebarFriendImg" src={user?.profilePicture}></Avatar>
                {/* <img className="sidebarFriendImg" src={user?.profilePicture} alt="" /> */}
                <span className="sidebarFriendName">{user.name}</span>
            </li>
        </Link>
    )
}
