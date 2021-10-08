import React from 'react';
import './Chat.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';

export default function Chat() {
    return (
        <>
        <Topbar />
        <div className="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper"> 
                    <input placeholder="Tìm kiếm bạn bè..." className="chatMenuInput" />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop" >
                        <Message />
                        <Message own={true}/>
                        <Message />
                        <Message />
                        <Message own={true}/>
                        <Message />
                        <Message />
                        <Message own={true}/>
                        <Message />
                        <Message />
                        <Message own={true}/>
                        <Message />
                    </div>
                    <div className="chatBoxBottom" >
                        <textarea className="chatBoxInput" placeholder="Soạn tin nhắn..." > </textarea>
                        <button className="chatSubmitButton" >Send</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
