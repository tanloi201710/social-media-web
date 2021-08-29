import React from 'react';
import './Profile.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';

export default function Profile({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
                            <img 
                                className="profileUserImg" 
                                src={user.result.imageUrl ? user.result.imageUrl : PF+'person/defaultUser.jpg'}
                                alt=""
                            />
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
