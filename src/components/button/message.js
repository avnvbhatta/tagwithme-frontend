import React, {useState} from 'react';
import "./interested.scss";
import { MessageFilled } from '@ant-design/icons';
import "./message.scss"
import ChatDrawer from "../chatdrawer/chatdrawer";

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
            {userData && 
                <ChatDrawer userData={userData} drawerVisible={drawerVisible} onClose={onClose}/>
            }
         </div>
    );
}
 
export default MessageButton;