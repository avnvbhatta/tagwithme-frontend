import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
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
import { useContext } from 'react';
import { UserContext } from '../../utils/usercontext';

const { Sider } = Layout;


const Sidebar = (props) => {
    const history = useHistory();
    //const {user, setUser} = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    const [selectedKey, setSelectedKey] = useState('/home')

    const logoClick = () => {
        setSelectedKey('/home')
        history.push(selectedKey);
    }

    const menuSelect = (e) =>{
        setSelectedKey(e.key)
    }

    const handleLogOut = () =>{
        Axios.get('http://localhost:4000/logout').then(res=>{
           // setUser(null);
            history.push('/login')
        }).catch(err => {
            
            if(err.response){
                console.log(err.response)
            }
        })   
    }
     

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
 
export default withRouter(Sidebar);