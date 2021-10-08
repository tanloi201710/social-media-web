import React from 'react';
import './Conversation.css';

export default function Conversation() {
    return (
        <div className="conversation">
            <img 
                className="conversationImg" 
                src="https://cdn.stocksnap.io/img-thumbs/280h/RJWIE303ZE.jpg"
                alt=""
            />
            <span className="conversationName"> William James </span>
        </div>
    )
}
