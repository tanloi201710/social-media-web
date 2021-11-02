import React, { useEffect, useState } from 'react';
import './notification.css';
import { Avatar } from '@mui/material';
import { getUser } from '../../api';

const Notification = ({friends=false, content}) => {
    const [user,setUser] = useState({});

    useEffect(() => {
        const get = async() => {
            try {
                const res = await getUser(content?.userId);
                console.log(res.data);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        get();
        
    }, [content.userId]);

    const NotifyAndMessage = () => {
        return (
            <li className="Item">
                <div className="notifyAvatar">
                    <Avatar src={user?.profilePicture} ></Avatar>
                </div>
                <div className="notifyContent">
                    <p><strong>{user?.name}</strong> {content.action}</p>
                    <span className="notifyTime">3 phút trước</span>
                </div>
                <div className="readMark"></div>
            </li>
        )
    }

    const Friends = () => {
        return (
            <li className="Item">
                <div className="notifyAvatar">
                    <Avatar src="" >T</Avatar>
                </div>
                <div className="notifyFriend">
                    <div className="notifyContent">
                        <p><strong>Hồ Tấn Lợi B1809148</strong> đã gửi lời mời kết bạn</p>
                        <div className="notifyAction">
                            <button className="btn btnCancel">Hủy</button>
                            <button className="btn btnAccept">Xác nhận</button>
                        </div>
                        <span className="notifyTime">3 phút trước</span>
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
