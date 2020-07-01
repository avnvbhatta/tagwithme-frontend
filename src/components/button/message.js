import React from 'react';
import "./interested.scss";
import { Button } from 'antd';
import { MessageFilled } from '@ant-design/icons';


const MessageButton = (props) => {
    const event = props.event;
    const handleClick = () =>{
        console.log(event.id);
    }
    return ( 
        <Button type="primary" shape="round" icon={<MessageFilled />} size={'large'}
        onClick={handleClick}
        >
          Message
        </Button>
    );
}
 
export default MessageButton;