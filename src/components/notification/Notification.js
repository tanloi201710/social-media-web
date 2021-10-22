import React from 'react';
import './notification.css';
import { Avatar } from '@mui/material';

const Notification = ({friends=false}) => {
    const NotifyAndMessage = () => {
        return (
            <li className="Item">
                <div className="notifyAvatar">
                    <Avatar src="" >T</Avatar>
                </div>
                <div className="notifyContent">
                    <p><strong>T</strong> đã nhắn tin cho bạn</p>
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
