import React, { useEffect } from 'react';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/post';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
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
