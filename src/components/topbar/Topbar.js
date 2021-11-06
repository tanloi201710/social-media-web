import { 
    Notifications, Person, Search, ArrowDropDownCircle, ExitToApp, Message
} from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import './Topbar.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Menu, withStyles, MenuItem, ListItemIcon, Avatar, Badge, IconButton
} from '@material-ui/core';
import decode from 'jwt-decode';
import { SET_SOCKET, LOGOUT } from '../../constants/actionTypes';
import Notification from '../notification/Notification';

export default function Topbar() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isFriendBox, setIsFriendBox] = useState(false);
    const [isChatBox, setIsChatBox] = useState(false);
    const [isNotifyBox, setIsNotifyBox] = useState(false);
    const [friendsNotify, setFriendsNotify] = useState([]);
    const [chatNotify, setChatNotify] = useState([]);
    const [postsNotify, setPostsNotify] = useState([]);
    const { savedSocket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleLogout = useCallback(() => {
        savedSocket?.current.disconnect();
        dispatch({ type: SET_SOCKET, payload: null });
        dispatch({ type: LOGOUT });
        history.push('/login');
        setUser(undefined);
    }, [dispatch, history,savedSocket]);

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location,user?.token,handleLogout]);

    useEffect(() => {
        savedSocket?.current.on('getMessageNotify', (data) => {
            setChatNotify((prev) => [data, ...prev]);
            console.log('new message');
        })
    }, [savedSocket])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const StyledMenu = withStyles({
        paper: {
          border: '1px solid #d3d4d5',
        },
        })((props) => (
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...props}
        />
    ));

    const switchMode = (mode) => {
        // 1: Friends
        // 2: Messages
        // 3: Notifications
        switch (mode) {
            case 1:
                setIsChatBox(false);
                setIsNotifyBox(false);
                setIsFriendBox(!isFriendBox);
                break;
        
            case 2:
                setIsChatBox(!isChatBox);
                setIsNotifyBox(false);
                setIsFriendBox(false);
                break;
            case 3:
                setIsChatBox(false);
                setIsNotifyBox(!isNotifyBox);
                setIsFriendBox(false);
                break;
            default:
                break;
        }
    }
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">SocialBook</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="search">
                    <Search className="searchIcon"/>
                    <input placeholder="Tìm kiếm bạn bè, hình ảnh, video ..." className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <Link to={`/profile/${user?.result._id}`} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="topbarLinks" >
                        {/* <img src={user.result.profilePicture ? user.result.profilePicture : PF+'person/defaultUser.jpg'} alt="" className="topbarImg"/> */}
                        <Avatar src={user?.result.profilePicture} className="topbarAvatar">{user.result.name.charAt(0).toUpperCase()}</Avatar>
                        <span className="topbarUsername">{user.result.name.split(' ').slice(-1).join(' ')}</span>
                    </div>
                </Link>

                <div className="topbarIcons">
                    {/* Friends Notifications */}
                    <IconButton className="topbarIconButtons" onClick={() => switchMode(1)}>
                        <Badge badgeContent={friendsNotify.length} color="error" className="topbarIconItem">
                            <Person fontSize="large"/>
                        </Badge>
                    </IconButton>
                    {   isFriendBox &&   
                        <div className="box">
                            <h2 className="boxTitle">Bạn bè</h2>
                            <div className="boxDivider"></div>
                            <ul className="boxItems">
                                { friendsNotify.map((chat,id) => (
                                    <Notification key={id} content={chat} friends />
                                ))}
                            </ul>
                        </div>
                    }

                    {/* Chat Notifications */}
                    <IconButton onClick={() => switchMode(2)}>
                        <Badge badgeContent={chatNotify.length} color="error" className="topbarIconItem">
                            <Message fontSize="large"/>
                        </Badge>
                    </IconButton>
                    {   isChatBox &&   
                        <div className="box">
                            <h2 className="boxTitle">Tin nhắn</h2>
                            <div className="boxDivider"></div>
                            <ul className="boxItems">
                                { chatNotify.map((chat,id) => (
                                    <Notification key={id} content={chat} />
                                ))}
                            </ul>
                            <span className="boxlinks" onClick={() => history.push('/chat')} > Xem tất cả trong tin nhắn </span>
                        </div>
                    }

                    {/* Posts Notifications */}
                    <IconButton onClick={() => switchMode(3)}>
                        <Badge badgeContent={postsNotify.length} color="error" className="topbarIconItem">
                            <Notifications fontSize="large"/>
                        </Badge>
                    </IconButton>
                    {   isNotifyBox &&   
                        <div className="box">
                            <h2 className="boxTitle">Thông báo</h2>
                            <div className="boxDivider"></div>
                            <ul className="boxItems">
                                { postsNotify.map((chat,id) => (
                                    <Notification key={id} content={chat} />
                                ))}
                            </ul>
                        </div>
                    }

                    {/* Settings */}
                    <IconButton>
                        <div className="topbarIconItem">
                            <ArrowDropDownCircle 
                                fontSize="large" 
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            />
                            <StyledMenu
                                className="topbarIconItemMenu"
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem className="topbarItemMenu" >
                                    <Link to={`/profile/${user.result._id ? user.result._id : user.result.googleId}`} style={{textDecoration: 'none'}}>
                                        <div className="topbarMenu">
                                            <ListItemIcon>
                                                <Avatar src={user.result.profilePicture} className="topbarMenuAvatar">{user.result.name.charAt(0).toUpperCase()}</Avatar>
                                            </ListItemIcon>
                                            <span className="topbarMenuText">{user.result.name}</span>
                                        </div>
                                    </Link>
                                </MenuItem>
                                <MenuItem className="topbarItemMenu" onClick={handleLogout}>
                                    <div className="topbarMenu">
                                        <ListItemIcon>
                                            <ExitToApp fontSize="large" className="topbarMenuIcon"/>
                                        </ListItemIcon>
                                        <span className="topbarMenuText">Đăng xuất</span>
                                    </div>
                                </MenuItem>
                            </StyledMenu>
                        </div>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
