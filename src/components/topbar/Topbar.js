import { 
    Notifications, Person, Search, ArrowDropDownCircle, ExitToApp, Message
} from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import './Topbar.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Menu, withStyles, MenuItem, ListItemIcon, Avatar, Badge, IconButton
} from '@material-ui/core';
import decode from 'jwt-decode';

export default function Topbar() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleLogout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
        setUser(undefined);
    }, [dispatch, history]);

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
                    <IconButton className="topbarIconButtons">
                        <Badge badgeContent={4} color="error" className="topbarIconItem">
                            <Person fontSize="large"/>
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={4} color="error" className="topbarIconItem">
                            <Message fontSize="large"/>
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={4} color="error" className="topbarIconItem">
                            <Notifications fontSize="large"/>
                        </Badge>
                    </IconButton>
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
                                <MenuItem className="topbarItemMenu">
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
