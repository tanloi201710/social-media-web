import { Chat, Notifications, Person, Search, ArrowDropDownCircle, ExitToApp} from '@material-ui/icons';
import React, { useState } from 'react';
import './Topbar.css';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Menu, withStyles, MenuItem, ListItemIcon} from '@material-ui/core';

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
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
                <Link to={`/profile/${user.result._id ? user.result._id : user.result.googleId}`} style={{textDecoration: 'none', color: 'white'}}>
                    <div className="topbarLinks">
                        <img src={user.result.imageUrl ? user.result.imageUrl : PF+'person/defaultUser.jpg'} alt="" className="topbarImg"/>
                        <span className="topbarUsername">{user.result.name}</span>
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
                    <div className="topbarIconItem">
                        <ArrowDropDownCircle 
                            fontSize="large" 
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        />
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            
                        <StyledMenuItem>
                            <Link to={`/profile/${user.result._id ? user.result._id : user.result.googleId}`} style={{textDecoration: 'none'}}>
                                <div className="topbarLinks">
                                    <img src={user.result.imageUrl ? user.result.imageUrl : PF+'person/defaultUser.jpg'} alt="" className="topbarImg"/>
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
                </div>
            </div>
        </div>
    )
}
