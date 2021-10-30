import { dateFormat } from '../../actions/format';
import React from 'react'
import './Message.css';

export default function Message({message, own}) {
    return (
        own ? (
            <div className="message own">
                <div className="messageTop">
                    <p className="messageTopText">
                        {message.text}
                    </p>
                    <img
                        className="messageTopImg"
                        src="https://cdn.stocksnap.io/img-thumbs/280h/RJWIE303ZE.jpg"
                        alt=""
                    />
                </div>
                <div className="messageBottom">{dateFormat(message.createdAt)}</div>
            </div>
        ) : (
            <div className="message">
                <div className="messageTop">
                    <img
                        className="messageTopImg"
                        src="https://cdn.stocksnap.io/img-thumbs/280h/RJWIE303ZE.jpg"
                        alt=""
                    />
                    <p className="messageTopText">
                        {message.text}
                    </p>
                </div>
                <div className="messageBottom">{dateFormat(message.createdAt)}</div>
            </div>
        )
    )
}
