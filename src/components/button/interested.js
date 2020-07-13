import React, {useContext} from 'react';
import "./interested.scss";
import { Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import axiosForAPI from "../../utils/axiosForAPI"


const InterestedButton = (props) => {
    const event = props.event;
    const handleClick = async () =>{
        const data = {
            ...event,
            userId: props.userData.id
        }
        
        let res = await axiosForAPI.post(process.env.REACT_APP_API_CREATE_INTERESTED_EVENT_ENDPOINT, data);
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