import React from 'react';
import "./interested.scss";
import { Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';


const InterestedButton = (props) => {
    const event = props.event;
    const handleClick = () =>{
        console.log(event.id);
    }
    return ( 
        <Button type="primary" shape="round" icon={<StarOutlined />} size={'large'}
        onClick={handleClick}
        >
          Interested
        </Button>
    );
}
 
export default InterestedButton;