import { dateFormat } from '../../actions/format';
import React from 'react'
import './Message.css';
import Emojify from 'react-emojione';

export default function Message({message, own}) {
    console.log(message);
    console.log(own);
    return (
        own ? (
            <div className="message own">
                <div className="messageTop">
                    <Emojify>
                        <p className="messageTopText">
                            {message.text}
                        </p>
                    </Emojify>
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
                        src="https://firebasestorage.googleapis.com/v0/b/social-images-store.appspot.com/o/images%2F1631451445869-Screenshot%20(20).png?alt=media&token=474698bb-9c27-462b-89fe-062ceb53a166"
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
