import { 
    PermMedia,
    Label,
    Room,
    EmojiEmotions 
} from '@material-ui/icons';
import React from 'react';
import './Share.css';

export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/nene.jfif" alt=""/>
                    <input 
                        placeholder="Bạn đang nghĩ gì vậy Nene"
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText"> Hình ảnh và Video</span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText"> Tag </span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText"> Check-in </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText"> Trạng thái </span>
                        </div>
                    </div>
                    <button className="shareButton">Đăng</button>
                </div>
            </div>
        </div>
    )
}
