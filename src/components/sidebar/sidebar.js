import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './sidebar.scss';
import {
    HomeOutlined,
    CommentOutlined,
    UserOutlined,
    NotificationOutlined
  } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    return (  
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                collapsible 
                breakpoint="sm"
                collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />} >
                        Profile
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CommentOutlined />} >
                        Messages
                    </Menu.Item>
                    <Menu.Item key="3" icon={<NotificationOutlined />} >
                        Notifications   
                    </Menu.Item>
                </Menu>
            </Sider>

      </Layout>
    );
}
 
export default Sidebar;