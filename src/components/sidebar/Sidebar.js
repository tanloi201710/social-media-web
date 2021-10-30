import { 
    Event, Group, HelpOutline, PlayCircleFilledOutlined, LocalHospital, StorefrontOutlined, 
    School, WorkOutline, ExpandLess, ExpandMore
} from '@material-ui/icons';
import {Collapse} from '@material-ui/core';
import {
    Box, SwipeableDrawer, Button
} from '@mui/material';
import React, {useState, useCallback, useEffect} from 'react';
import './Sidebar.css';
import CloseFriend from '../closeFriend/CloseFriend';
import {Link} from 'react-router-dom';
import { getRecommentFriends } from '../../api';
import { useSelector } from 'react-redux';
import TodoList from "../todoList/TodoList";
import Textfield from "@atlaskit/textfield";
import ButtonAt from '@atlaskit/button';
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = "TODO_APP";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [openShopping, setOpenShopping] = useState(false);

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
        return () => {
            setRecommentFriends([]);
        }
    }, [authData.result._id]);
    
    // events begin
    const [state, setState] = React.useState({ right: false });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if ( event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [todoList, setTodoList] = useState([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
        const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
        if (storagedTodoList) {
            setTodoList(JSON.parse(storagedTodoList));
        }
    }, []);
  
    useEffect(() => {
        localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
    }, [todoList]);
  
    const onTextInputChange = useCallback((e) => {
        setTextInput(e.target.value);
    }, []);
  
    const onAddBtnClick = useCallback((e) => {
        setTodoList([
            {
                id: v4(), 
                name: textInput, 
                isComplete: false,
            },
            ...todoList,
        ]);
        
        setTextInput("")
    }, [textInput, todoList]);
  
    const onCheckBtnClick = useCallback((id) => {
        setTodoList(
            prevState => 
                prevState.map( todo => 
                    todo.id === id ? {...todo, isCompleted: true} : todo
                )
        );
    }, []);

    const onCheckBtnClickRemove = useCallback((id) => {
        setTodoList(
            prevState => 
                prevState.map( todo => 
                    todo.id === id ? {...todo, isCompleted: false} : todo
                )
        );
    }, []);
    // events end

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link to="/Covid-19" style={{textDecoration:"none", color: 'black'}}>
                        <li className="sidebarListItem">
                            <LocalHospital className="sidebarIcon" />
                            <span className="sidebarListItemText">Covid-19</span>
                        </li>
                    </Link>

                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>

                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>

                    <li className="sidebarListItem" onClick={() => setOpenShopping(!openShopping)}>
                        <StorefrontOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Shopping</span>
                        {openShopping ? <ExpandLess /> : <ExpandMore />}
                    </li>

                    <Collapse in={openShopping} timeout="auto" unmountOnExit>
                        <a target='_blank' rel='noreferrer' href='https://shopee.vn/' style={{textDecoration:"none"}}>
                            <li className="sidebarListItemChil" >
                                <img src='/assets/logo_shopee.png' alt='' className="sidebarIconImg"/>
                                <span className="sidebarListItemText">Shopee</span>
                            </li>
                        </a>
                        <a target='_blank' rel='noreferrer' href='https://tiki.vn/' style={{textDecoration:"none"}}>
                            <li className="sidebarListItemChil">
                                <img src='/assets/logo_tiki.png' alt='' className="sidebarIconImg"/>
                                <span className="sidebarListItemText">Tiki</span>
                            </li>
                        </a>
                        <a target='_blank' rel='noreferrer' href='https://lazada.vn/' style={{textDecoration:"none"}}>
                            <li className="sidebarListItemChil">
                                <img src='/assets/logo_lazada.png' alt='' className="sidebarIconImg"/>
                                <span className="sidebarListItemText">Lazada</span>
                            </li>
                        </a>
                        <a target='_blank' rel='noreferrer' href='https://sendo.vn/' style={{textDecoration:"none"}}>
                            <li className="sidebarListItemChil">
                                <img src='/assets/logo_sendo.png' alt='' className="sidebarIconImg"/>
                                <span className="sidebarListItemText">Sendo</span>
                            </li>
                        </a>
                    </Collapse>

                    <li className="sidebarListItem" onClick={toggleDrawer('right', true)}>
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>

                    <SwipeableDrawer
                        anchor={'right'}
                        open={state['right']}
                        onOpen={toggleDrawer('right', true)}
                        onClose={toggleDrawer('right', false)}
                    >
                        <Box
                            sx={{ width: 400 }}
                            role="presentation"
                            className="sidebarEventBox"
                        >
                            <div className="sidebarEventContent">
                                <h3 className="sidebarEventTitle">Danh sách các sự kiện</h3>
                                <Textfield 
                                    className="sidebarEventInput"
                                    name='add'
                                    placeholder='Thêm việc cần làm ...'
                                    onKeyDown={(e) => { if(e.key === 'Enter') onAddBtnClick() }} 
                                    elemAfterInput={
                                        <ButtonAt 
                                            className="sidebarEventButton"
                                            isDisabled={!textInput}
                                            appearance='primary'
                                            onClick={onAddBtnClick}
                                        > Thêm </ButtonAt>
                                    }
                                    value={textInput}
                                    onChange={onTextInputChange}
                                ></Textfield>
                                <div className="sidebarEventTodo">
                                    <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} onCheckBtnClickRemove={onCheckBtnClickRemove}></TodoList>
                                </div>
                                <Button variant="outlined" color="primary" onClick={() => setTodoList([])}>Xóa hết sự kiện</Button>
                            </div>
                        </Box>
                    </SwipeableDrawer>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <li className="sidebarListItem">
                            <HelpOutline className="sidebarIcon" />
                            <span className="sidebarListItemText">Questions</span>
                        </li>

                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" />
                            <span className="sidebarListItemText">Jobs</span>
                        </li>

                        <li className="sidebarListItem">
                            <School className="sidebarIcon" />
                            <span className="sidebarListItemText">Courses</span>
                        </li>
                    </Collapse>
                </ul>

                <Button className="sidebarButton" variant="outlined" color="primary" onClick={() => setOpen(!open)}>{open ? `thu nhỏ` : `Xem thêm`}</Button>
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

