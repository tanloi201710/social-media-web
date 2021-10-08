import React from 'react'
import './Message.css';

export default function Message({own}) {
    return (
        own ? (
            <div className="message own">
                <div className="messageTop">
                    <p className="messageTopText">
                        Hello this is a message
                    </p>
                    <img
                        className="messageTopImg"
                        src="https://cdn.stocksnap.io/img-thumbs/280h/RJWIE303ZE.jpg"
                        alt=""
                    />
                </div>
                <div className="messageBottom"> 1 hour ago </div>
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
                        Hello this is a message Hello this is a message Hello this is a message Hello this is a message Hello this is a message Hello
                    </p>
                </div>
                <div className="messageBottom"> 1 hour ago </div>
            </div>
        )
    )
}
