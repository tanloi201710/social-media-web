import React, { useEffect, useState } from 'react';
import './notification.css';
import { Avatar } from '@mui/material';
import Emojify from 'react-emojione';
import { getUser } from '../../api';
import { dateFormat } from '../../actions/format';

const Notification = ({friends=false, content}) => {
    const [user,setUser] = useState({});

    useEffect(() => {
        const get = async() => {
            try {
                const res = await getUser(content?.sender);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        get();
        
    }, [content.sender]);

    const NotifyAndMessage = () => {
        return (
            <li className="Item">
                <div className="notifyAvatar">
                    <Avatar src={user?.profilePicture} ></Avatar>
                </div>
                <div className="notifyContent">
                    <p><strong>{user?.name}</strong><Emojify> {content.action}</Emojify></p>
                    <span className="notifyTime">{dateFormat(content.createdAt)}</span>
                </div>
                <div className="readMark"></div>
            </li>
        )
    }

    const Friends = () => {
        return (
            <li className="Item">
                <div className="notifyAvatar">
                    <Avatar src={user?.profilePicture} ></Avatar>
                </div>
                <div className="notifyFriend">
                    <div className="notifyContent">
                        <p><strong>{user?.name}</strong><Emojify> {content.action}</Emojify></p>
                        <div className="notifyAction">
                            <button className="btn btnCancel">Hủy</button>
                            <button className="btn btnAccept">Theo dõi lại</button>
                        </div>
                        <span className="notifyTime">{dateFormat(content.createdAt) || 'vừa xong'}</span>
                    </div>
                </div>
            </li>
        )
    }

    return (
        !friends ? <NotifyAndMessage /> : <Friends />
    )
}


export default Notification
