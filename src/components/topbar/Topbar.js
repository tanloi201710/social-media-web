import { Notifications, Person, Search, ArrowDropDownCircle, ExitToApp, Message} from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import './Topbar.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Menu, withStyles, MenuItem, ListItemIcon, Avatar, Badge, IconButton} from '@material-ui/core';
import decode from 'jwt-decode';

export default function Topbar() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleLogout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
        setUser(null);
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

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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

    const StyledMenuItem = withStyles((theme) => ({
        root: {
          '&:focus': {
            backgroundColor: theme.palette.common.white,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: theme.palette.common.white,
            },
          },
        },
      }))(MenuItem);
    
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
                    <div className="topbarLinks" >
                        {/* <img src={user.result.profilePicture ? user.result.profilePicture : PF+'person/defaultUser.jpg'} alt="" className="topbarImg"/> */}
                        <Avatar src={user.result.profilePicture} className="topbarImg">{user.result.name.charAt(0).toUpperCase()}</Avatar>
                        <span className="topbarUsername">{user.result.name}</span>
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
                                onClick={handleClickMenu}
                            />
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                            <StyledMenuItem>
                                <Link to={`/profile/${user.result._id ? user.result._id : user.result.googleId}`} style={{textDecoration: 'none'}}>
                                    <div className="topbarLinks">
                                        <Avatar src={user.result.profilePicture} className="topbarImg">{user.result.name.charAt(0).toUpperCase()}</Avatar>
                                        <span className="topbarUsernameMenu">{user.result.name}</span>
                                    </div>
                                </Link>
                            </StyledMenuItem>
                            <StyledMenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <ExitToApp fontSize="large" />
                                </ListItemIcon>
                                <span className="topbarUsernameMenu">Đăng xuất</span>
                            </StyledMenuItem>
                            </StyledMenu>
                        </div>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
