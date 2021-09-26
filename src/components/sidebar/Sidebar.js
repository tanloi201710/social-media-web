import { 
    Event, Group, HelpOutline, PlayCircleFilledOutlined, 
    LocalHospital, StorefrontOutlined, School, WorkOutline 
} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import CloseFriend from '../closeFriend/CloseFriend'
import {Link} from 'react-router-dom';
import { getRecommentFriends } from '../../api';
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const { authData } = useSelector((state) => state.auth);
    const [recommentFriends, setRecommentFriends] = useState([]);

    useEffect(() => {
        const fetchRecommentFriends = async() => {
            console.log("eff call");
            try {
                const recommentList = await getRecommentFriends(authData.result._id);
                setRecommentFriends(recommentList.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRecommentFriends();
    },[authData.result._id]);
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link to="/Covid-19" style={{textDecoration:"none", color: 'black'}}>
                        <li className="sidebarListItem">
                            <LocalHospital fontSize="large" className="sidebarIcon" />
                            <span className="sidebarListItemText">Covid-19</span>
                        </li>
                    </Link>

                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>

                    <li className="sidebarListItem">
                        <Group fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>

                    <li className="sidebarListItem">
                        <StorefrontOutlined fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>

                    <li className="sidebarListItem">
                        <HelpOutline fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>

                    <li className="sidebarListItem">
                        <WorkOutline fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>

                    <li className="sidebarListItem">
                        <Event fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>

                    <li className="sidebarListItem">
                        <School fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>

                </ul>

                <Button className="sidebarButton" variant="outlined" color="primary">Xem thêm</Button>
                <hr className="sidebarHr"/>
                <h4 className="sidebarTitle">Gợi ý kết bạn</h4>
                <ul className="sidebarFriendList">
                    {recommentFriends.map(u => (
                        <CloseFriend key={u._id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
