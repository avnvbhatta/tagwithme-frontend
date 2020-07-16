import React from 'react';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import "./follow.scss"
const Follow = (props) => {
    

    const handleClick = () =>{
        let id = null;
        try {
            id = props.event.userid;
        } catch (error) {
            id = props.followId;
        }
        
        console.log(id)
    }
    return ( 
        <button className="followBtn"
        onClick={handleClick}
        >
          <UserAddOutlined /> Follow
        </button>
    );
}
 
export default Follow;