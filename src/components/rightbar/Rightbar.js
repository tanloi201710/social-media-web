import React from 'react';
import './Rightbar.css';
import {Users} from '../../dummyData';
import Online from '../online/Online';

export default function Rightbar({profile}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthContainer">
                    <img className="birthImg" src="/assets/gift.jpg" alt=""/>
                    <span className="birthText">
                        Hôm nay là sinh nhật của
                        <b> Naruto</b> and <b>3 người khác</b>
                    </span>
                </div>
                <img className="rightbarAd" src="assets/op.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u}/>
                    ))}

                    {Users.map(u => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
            <h4 className="rightbarTitle">Thông tin</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Thành phố: </span>
                    <span className="rightbarInfoValue">Cần Thơ</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Đến từ: </span>
                    <span className="rightbarInfoValue">An Giang</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Nghề nghiệp</span>
                    <span className="rightbarInfoValue">Sinh Viên</span>
                </div>
            </div>
            <h4 className="rightbarTitle">Bạn bè</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src={`${PF}person/nene.jfif`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Nene</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/berg.jfif`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Mark Zuckerberg</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/bill.jfif`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Bill Gates</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/luffy.jfif`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Monkey D Luffy</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}person/naruto.jfif`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Uzumaki Naruto</span>
                </div>
                <div className="rightbarFollowing">
                    <img src={`${PF}post/nene.jpg`} alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">Nene</span>
                </div>
            </div>
            <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u}/>
                    ))}

                    {Users.map(u => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightBar />}
            </div>
        </div>
    )
}
