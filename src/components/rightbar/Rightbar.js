import React from 'react';
import './Rightbar.css';
import {Users} from '../../dummyData';
import Online from '../online/Online';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Tabs, Tab, Typography, Box, ImageList, ImageListItem, Button, useTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import SwipeableViews from 'react-swipeable-views';

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
                <hr className="rightbarHr"/>
                <img className="rightbarAd" src="assets/op.png" alt="" />
                <hr className="rightbarHr"/>
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

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
                )}
            </div>
        );
    }
      
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    
    function tabsProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
    }
    
    const useStyles = makeStyles((theme) => ({
        friendAndPicture: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        picture: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        pictureList: {
            width: 430,
            height: 500,
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
          fabGreen: {
            color: theme.palette.common.white,
            backgroundColor: green[500],
            '&:hover': {
              backgroundColor: green[600],
            },
        },
        indicator: {
            backgroundColor: 'white',
        },
    }));

    const ProfileRightbar = () => {
        const classes = useStyles();
        const theme = useTheme();
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
        const handleChangeIndex = (index) => {
            setValue(index);
        };

        return (
            <>
            <div className={classes.friendAndPicture}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="Tabs Profile" classes={{indicator: classes.indicator}} >
                        <Tab label="Bạn bè" {...tabsProps(0)} />
                        <Tab label="Ảnh" {...tabsProps(1)} />
                        <Tab label="Thông tin" {...tabsProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
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
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className={classes.picture}>
                            <ImageList rowHeight={160} className={classes.pictureList} cols={3}>
                            {/* {itemData.map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1}>
                                <img src={item.img} alt={item.title} />
                                </ImageListItem>
                            ))} */}
                                <ImageListItem cols={ 2 || 1}>
                                    <img src="https://image.shutterstock.com/image-photo/large-beautiful-drops-transparent-rain-260nw-668593321.jpg" alt="" />
                                </ImageListItem>
                                <ImageListItem cols={1}>
                                    <img src="https://cdn.stocksnap.io/img-thumbs/960w/chalet-wood_7PBFL1ERJT.jpg" alt="" />
                                </ImageListItem>
                                <ImageListItem cols={1}>
                                    <img src="https://cdn.stocksnap.io/img-thumbs/960w/bees-flower_BKHRBSRAUC.jpg" alt="" />
                                </ImageListItem>
                                <ImageListItem cols={2}>
                                    <img src="https://cdn.stocksnap.io/img-thumbs/280h/G88ECALHBL.jpg" alt="" />
                                </ImageListItem>
                                <ImageListItem cols={ 2 || 1}>
                                    <img src="https://cdn.stocksnap.io/img-thumbs/280h/husky-animal_UJVB2QEHNH.jpg" alt="" />
                                </ImageListItem>
                                <ImageListItem cols={1}>
                                    <img src="https://cdn.stocksnap.io/img-thumbs/280h/RJWIE303ZE.jpg" alt="" />
                                </ImageListItem>
                            </ImageList>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {/* <Link to="/changeInfo" style={{textDecoration:"none"}}> */}
                            <Button variant="outlined" color="primary" onClick={()=> window.location.href='/changeInfo'}>Chỉnh sửa thông tin</Button>
                        {/* </Link> */}
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
                    </TabPanel>
                </SwipeableViews>
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
