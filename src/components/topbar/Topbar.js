import { Chat, Notifications, Person, Search } from '@material-ui/icons';
import React, { useState } from 'react';
import './Topbar.css';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
        setUser(null);
    };
    return (
        <div className="topbarContainer">

            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">ThanhSocial</span>
                </Link>
            </div>

            <div className="topbarCenter">
                <div className="search">
                    <Search className="searchIcon"/>
                    <input placeholder="Tìm kiếm bạn bè, hình ảnh, video ..." className="searchInput" />
                </div>
            </div>

            <div className="topbarRight">
                <Link to={`/profile/${user.result._id}`} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="topbarLinks">
                        <img src={user.result.imageUrl ? user.result.imageUrl : PF+'person/defaultUser.jpg'} alt="" className="topbarImg"/>
                        <span className="topbarUsername">{user.result.name}</span>
                        {/* <span className="topbarLink">Trang chủ</span>
                        <span className="topbarLink">Timeline</span> */}
                    </div>
                </Link>

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person fontSize="large"/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat fontSize="large"/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications fontSize="large"/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <button onClick={handleLogout}>Đăng xuất</button>
                </div>
            </div>
        </div>
    )
}
