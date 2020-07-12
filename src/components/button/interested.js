import React, {useContext} from 'react';
import "./interested.scss";
import { Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import Axios from "axios";
import {connect} from "react-redux";


const InterestedButton = (props) => {
    const event = props.event;
    const handleClick = async () =>{
        const data = {
            ...event,
            userId: props.userData.id
        }
        
        let res = await Axios.post(process.env.REACT_APP_API_CREATE_INTERESTED_EVENT_ENDPOINT, data);
        console.log(res);

    }
    return ( 
        <Button type="primary" shape="round" icon={<StarOutlined />} size={'large'}
        onClick={handleClick}
        >
          Interested
        </Button>
    );
}

const mapStateToProps = (state) =>{
    return{
        userData: state.userData   
    }
}
 
export default connect(mapStateToProps)(InterestedButton);