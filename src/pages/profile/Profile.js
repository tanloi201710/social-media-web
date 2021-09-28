import React, { useEffect, useState } from 'react';
import './Profile.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import { Avatar } from '@material-ui/core';
import { Button } from '@mui/material';
import { PersonAddRounded, ChatRounded, DoneAllRounded } from '@mui/icons-material';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api';
import { followUser, unfollowuser } from '../../actions/user';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const id = useParams().id;
    const dispatch = useDispatch();

    const { authData } = useSelector((state) => state.auth);
    const { userData } = useSelector((state) => state.user);

    const [user,setUser] = useState({});
    const [followed,setFollowed] = useState(authData.result.followings.includes(id));

    useEffect(() => {
        setFollowed(userData.result.followings.includes(id));
    }, [userData,id]);
    
    useEffect(() => {
        console.log("fetch user");
        const fetchUsers = async() => {
            try {
                const res = await getUser(id);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    },[id]);
    

    const handleAddFriend = () => {
        if(!followed) {
            dispatch(followUser(id));
        } else {
            dispatch(unfollowuser(id));
        }
        setFollowed(!followed);
    }

    return (
        <> 
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                className="profileCoverImg"
                                src={`${PF}post/luffy.jpg`}
                                alt=""
                            />
                            {/* <img 
                                className="profileUserImg" 
                                src={user.result.profilePicture ? user.result.profilePicture : PF+'person/defaultUser.jpg'}
                                alt=""
                            /> */}
                            <Avatar className="profileUserImg" src={user.profilePicture && user.profilePicture}></Avatar>

                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.name && user.name}</h4>
                        </div>
                        {
                            authData?.result._id !== id && 
                            <div className="profileAddFriend">
                                {
                                    !followed ?
                                    <Button variant="contained" onClick={handleAddFriend}>
                                        Thêm bạn &nbsp;
                                        <PersonAddRounded fontSize="small"/>
                                    </Button>
                                    :
                                    <Button>
                                        Bạn bè &nbsp;
                                        <DoneAllRounded fontSize="small" />
                                    </Button>
                                }
                                
                                <Button variant="outlined">
                                    Nhắn tin &nbsp;
                                    <ChatRounded fontSize="small" />
                                </Button>
                            </div>
                        }
                    </div>
                    <div className="profileRightBottom">
                    <Feed user={id} />
                    <Rightbar profile/>
                    {/* <div className="feedComp"></div>
                    <div className="rightBarComp"></div> */}
                        
                    </div>
                </div>
            </div>
            
        
        </>
    )
}
