import React, { useEffect } from 'react';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import { useSelector } from 'react-redux';

export default function Home({user}) {
    const { savedSocket } = useSelector((state) => state.socket);
    console.log(savedSocket);
    useEffect(() => {
        if(savedSocket !== null ) {
            savedSocket.current.emit('addUser', 
                {
                    userId: user.result._id, 
                    userName: user.result.name
                }
            );
            savedSocket.current.on('getUsers', (users) => {
                console.log(users);
            })
        }
    }, [user.result, savedSocket]);

    return (
        <> 
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed/>
                <Rightbar />
            </div>
        
        </>
    )
}
