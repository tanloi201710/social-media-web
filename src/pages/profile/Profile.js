import React from 'react';
import './Profile.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import { Avatar } from '@material-ui/core';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    console.log("call back");
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <> 
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                className="profileCoverImg"
                                src={`${PF}post/luffy.jpg`}
                                alt=""
                            />
                            {/* <img 
                                className="profileUserImg" 
                                src={user.result.profilePicture ? user.result.profilePicture : PF+'person/defaultUser.jpg'}
                                alt=""
                            /> */}
                            <Avatar className="profileUserImg" src={user.result.profilePicture}>{user.result.name.charAt(0).toUpperCase()}</Avatar>

                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.result.name}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
            
        
        </>
    )
}
