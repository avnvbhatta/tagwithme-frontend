import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './sidebar.scss';
import { Link, withRouter, useHistory} from 'react-router-dom';
import Axios from "axios";
import {
    HomeOutlined,
    CommentOutlined,
    UserOutlined,
    NotificationOutlined,
    SlackOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import {connect} from "react-redux";

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
        setSelectedKey(e.key)
    }

    //Remove session details and set global user context to null
    const handleLogOut = () =>{
        Axios.get(process.env.REACT_APP_API_LOGOUT_ENDPOINT).then(res=>{
            props.logOut();
            setSelectedKey('/home');
            history.push('/login');
        }).catch(err => {
            
            if(err.response){
                console.log(err.response)
            }
        })   
    }
     
    //Don't display sidebar on login and signup screens
    if (props.location.pathname === '/' || props.location.pathname === '/login' || props.location.pathname === '/signup') return null;
    return (  
            <Sider className="sidebar"
                collapsible 
                breakpoint="sm"
                collapsed={collapsed} onCollapse={onCollapse}>
                <SlackOutlined onClick={logoClick} style={{ fontSize: '32px', color: '#08c' }} className="logo" />
                <Menu theme="dark" defaultSelectedKeys={selectedKey} selectedKeys={selectedKey} mode="inline" onSelect={menuSelect}>
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        Home<Link to="/home" />
                    </Menu.Item>
                    <Menu.Item key="/profile" icon={<UserOutlined />} >
                        Profile<Link to="/profile" />
                    </Menu.Item>
                    <Menu.Item key="/message" icon={<CommentOutlined />} >
                        Messages<Link to="/messages" />
                    </Menu.Item>
                    <Menu.Item key="/notifications" icon={<NotificationOutlined />} >
                        Notifications<Link to="/notifications" />   
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogOut}>
                        Log Out  
                    </Menu.Item>
                </Menu>
            </Sider>
    );
}

const mapDispatchToProps = (dispatch) => {
    return{
        logOut: (response) => dispatch({type: 'LOG_OUT'})
    }
}
 
export default connect(null, mapDispatchToProps)(withRouter(Sidebar));