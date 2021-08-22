import { 
    Event, 
    Group, 
    HelpOutline, 
    PlayCircleFilledOutlined, 
    LocalHospital,
    StorefrontOutlined,
    School, 
    WorkOutline 
} from '@material-ui/icons';
import React from 'react';
import './Sidebar.css';
import {Users} from '../../dummyData';
import CloseFriend from '../closeFriend.js/CloseFriend';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">

                    <li className="sidebarListItem">
                        <LocalHospital fontSize="large" className="sidebarIcon" />
                        <span className="sidebarListItemText">Covid-19</span>
                    </li>

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

                <button className="sidebarButton">Xem thêm</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}

                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}

                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}

                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
