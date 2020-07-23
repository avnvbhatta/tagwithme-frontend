import React, { useState } from 'react';
import { Layout, Menu, Badge } from 'antd';
import 'antd/dist/antd.css';
import './sidebar.scss';
import { Link, withRouter, useHistory} from 'react-router-dom';
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
    const history = useHistory();
    //State of sidebar collapse
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    //Set default menu select
    const [selectedKey, setSelectedKey] = useState('/home')

    //Navigate to home on logo click
    const logoClick = () => {
        setSelectedKey('/home')
        history.push(selectedKey);
    }

    //Update state based on menu selection
    const menuSelect = (e) =>{
        if(e.key === 'logout'){
            setSelectedKey("/home");
            props.logOut();
            history.push('/login')
        }
        if(e.key === '/notifications'){
            if(newNotificationAlert){
                setNewNotificationAlert(false);
            }
        }
        setSelectedKey(e.key)
    }

    const [newNotificationAlert, setNewNotificationAlert] = useState(false);

     
    //Don't display sidebar on login and signup screens
    if (props.location.pathname === '/' || props.location.pathname === '/login' || props.location.pathname === '/signup') return null;
    return (  
            <Sider className="sidebar"
                collapsible 
                breakpoint="sm"
                collapsed={collapsed} onCollapse={onCollapse}>
                <SlackOutlined onClick={logoClick} style={{ fontSize: '32px', color: '#08c' }} className="logo" />
                <Menu theme="dark" defaultSelectedKeys={"/home"} selectedKeys={selectedKey} mode="inline" onSelect={menuSelect}>
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        Home<Link to="/home" />
                    </Menu.Item>
                    <Menu.Item key="/feed" icon={<GlobalOutlined />} >
                        Feed<Link to="/feed" />
                    </Menu.Item>
                    <Menu.Item key="/profile" icon={<UserOutlined />} >
                        Profile<Link to="/profile" />
                    </Menu.Item>
                    <Menu.Item key="/message" icon={<CommentOutlined />} >
                        Messages<Link to="/messages" />
                    </Menu.Item>
                    <Menu.Item key="/notifications" icon={<Badge dot={collapsed && newNotificationAlert} style={{top: '12px'}}><NotificationOutlined /></Badge>} >
                        {!collapsed && <Link to="/notifications" ><Badge dot={newNotificationAlert} style={{right: '-6px'}}>Notifications</Badge></Link>  }
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        Log Out  
                    </Menu.Item>
                </Menu>
                <SocketComponent newNotificationAlert={[newNotificationAlert, setNewNotificationAlert] }/> 
            </Sider>
    );
}

const mapDispatchToProps = (dispatch) => {
    return{
        logOut: (response) => dispatch({type: 'USER_LOG_OUT'})
    }
}
 
export default connect(null, mapDispatchToProps)(withRouter(Sidebar));