import { Chat, Notifications, Person, Search } from '@material-ui/icons';
import React from 'react';
import './Topbar.css';
import {Link} from 'react-router-dom';

export default function Topbar() {
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
                <div className="topbarLinks">
                    <img src="/assets/person/nene.jfif" alt="" className="topbarImg"/>
                    <span className="topbarUsername">Ngô Tấn Thành</span>
                    {/* <span className="topbarLink">Trang chủ</span>
                    <span className="topbarLink">Timeline</span> */}
                </div>

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
                
                </div>
            </div>
        </div>
    )
}
