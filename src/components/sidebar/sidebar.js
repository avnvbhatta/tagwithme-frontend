import React, { useState } from 'react';
import { Layout, Menu, Badge } from 'antd';
import 'antd/dist/antd.css';
import './sidebar.scss';
import { Link, withRouter, useHistory, useLocation} from 'react-router-dom';
import {
    HomeOutlined,
    CommentOutlined,
    UserOutlined,
    NotificationOutlined,
    SlackOutlined,
    LogoutOutlined,
    GlobalOutlined
  } from '@ant-design/icons';
import {connect} from "react-redux";
import SocketComponent from '../socket/socket';

const { Sider } = Layout;


const Sidebar = (props) => {
    let location = useLocation();
    let currentComponentPath = "/home";
    if(location.pathname.toLowerCase().includes('home')){
        currentComponentPath = "/home";
    }
    else if(location.pathname.toLowerCase().includes('profile')){
        currentComponentPath = "/profile";
    }
    else if(location.pathname.toLowerCase().includes('events')){
        currentComponentPath = "/events";
    }
    else if(location.pathname.toLowerCase().includes('messages')){
        currentComponentPath = "/messages";
    }
    else if(location.pathname.toLowerCase().includes('notification')){
        currentComponentPath = "/notifications";
    }
    else if(location.pathname.toLowerCase().includes('feed')){
        currentComponentPath = "/feed";
    }
    


    const history = useHistory();
    //State of sidebar collapse
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    //Set default menu select
    const [selectedKey, setSelectedKey] = useState(currentComponentPath)

    //Navigate to home on logo click
    const logoClick = () => {
        setSelectedKey('/home')
        history.push(selectedKey);
    }

    const [newGenericNotificationAlert, setNewGenericNotificationAlert] = useState(false);
    const [newMessageNotificationAlert, setNewMessageNotificationAlert] = useState(false);

    const [theme, setTheme] = useState("light");
    //Update state based on menu selection
    const menuSelect = (e) =>{
        if(e.key === 'logout'){
            setSelectedKey("/home");
            props.logOut();
            history.push('/login');
            window.location.reload();
        }
        if(e.key === '/notifications'){
            if(newGenericNotificationAlert){
                setNewGenericNotificationAlert(false);
            }
            history.push('/notifications');

        }
        if(e.key === '/message'){
            if(newMessageNotificationAlert){
                setNewMessageNotificationAlert(false);
            }
            history.push('/messages');

        }
        setSelectedKey(e.key)
    }


     
    //Don't display sidebar on login and signup screens
    if (props.location.pathname === '/' || props.location.pathname === '/login' || props.location.pathname === '/signup') return null;
    return (  
            <Sider className="sidebar"
                collapsible 
                breakpoint="sm"
                theme={theme}
                collapsed={collapsed} onCollapse={onCollapse}>
                <SlackOutlined onClick={logoClick} style={{ fontSize: '32px', color: '#08c' }} className="logo" />
                <Menu theme={theme} defaultSelectedKeys={"/home"} selectedKeys={selectedKey} mode="inline" onSelect={menuSelect}>
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        Home<Link to="/home" />
                    </Menu.Item>
                    <Menu.Item key="/feed" icon={<GlobalOutlined />} >
                        Feed<Link to="/feed" />
                    </Menu.Item>
                    <Menu.Item key="/profile" icon={<UserOutlined />} >
                        Profile<Link to="/profile" />
                    </Menu.Item>
                    {/* <Menu.Item key="/message" icon={<CommentOutlined />} >
                        Messages<Link to="/messages" />
                    </Menu.Item> */}
                    <Menu.Item key="/message" icon={<Badge dot={collapsed && newMessageNotificationAlert} style={{top: '12px'}}><CommentOutlined /></Badge>} >
                        {!collapsed && <Link to="/messages" ><Badge dot={newMessageNotificationAlert} style={{right: '-6px'}}>Messages</Badge></Link>  }
                    </Menu.Item>
                    <Menu.Item key="/notifications" icon={<Badge dot={collapsed && newGenericNotificationAlert} style={{top: '12px'}}><NotificationOutlined /></Badge>} >
                        {!collapsed && <Link to="/notifications" ><Badge dot={newGenericNotificationAlert} style={{right: '-6px'}}>Notifications</Badge></Link>  }
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        Log Out  
                    </Menu.Item>
                </Menu>
                <SocketComponent 
                newGenericNotificationAlert={[newGenericNotificationAlert, setNewGenericNotificationAlert] }
                newMessageNotificationAlert={[newMessageNotificationAlert, setNewMessageNotificationAlert] }
                
                /> 
            </Sider>
    );
}



const mapDispatchToProps = (dispatch) => {
    return{
        logOut: (response) => dispatch({type: 'USER_LOG_OUT'}),
        setNewMessageNotification: (data) => dispatch({type: 'SET_NEW_MESSAGE_NOTIFICATION', val: data }),
        setNewGeneralNotification: (data) => dispatch({type: 'SET_NEW_GENERAL_NOTIFICATION', val: data }),
    }
}
 
export default connect(null, mapDispatchToProps)(withRouter(Sidebar));