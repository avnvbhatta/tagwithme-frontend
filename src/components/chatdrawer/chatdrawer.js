import React from 'react';
import ChatWindow from '../chatwindow/chatwindow';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';

const ChatDrawer = (props) => {
    const userData = props.userData;
    const drawerVisible = props.drawerVisible;
    const onClose = props.onClose;
    return ( 
        <Drawer
            className="drawer"  
            title={<Link to={`/profile/${userData.id}`}>{userData.name}</Link>}
            placement="right"
            closable={true}
            onClose={onClose}
            width="300"
            destroyOnClose
            visible={drawerVisible}
            bodyStyle={{padding: '0px'}}
        >
            <ChatWindow receiver_id={userData.id}/>
        
        </Drawer> 
    );
}
 
export default ChatDrawer;