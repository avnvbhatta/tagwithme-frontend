import React, {useState} from 'react';
import "./interested.scss";
import { Button, Drawer } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import ChatWindow from '../chatwindow/chatwindow';
import "./message.scss"

const MessageButton = (props) => {
    const userData = props.userData;
    const [drawerVisible, setDrawerVisible] = useState(false);


    const showDrawer = () => {
        setDrawerVisible(true);
      };
    
    const onClose = () => {
        setDrawerVisible(false);
    };
    return (
         <div className="container">
            
            <button className="my-btn"
                onClick={showDrawer}
            >
            <MessageFilled /> Message
            </button>
            <Drawer
                className="drawer"  
                title={userData.name}
                placement="right"
                closable={true}
                onClose={onClose}
                width="300"
                visible={drawerVisible}
                bodyStyle={{padding: '0px'}}
            >
                <ChatWindow receiver_id={userData.id}/>
            
            </Drawer>

         </div>
        
    );
}
 
export default MessageButton;