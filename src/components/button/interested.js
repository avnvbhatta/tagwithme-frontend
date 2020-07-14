import React, {useState} from 'react';
import "./interested.scss";
import { Button } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import {connect} from "react-redux";
import axiosForAPI from "../../utils/axiosForAPI"


const InterestedButton = (props) => {
    const [isInterested, setIsInterested] = useState(props.event.isInterested);
    const handleClick = async () =>{
        
        if(isInterested){
            const data = {
                eventId: props.event.id,
                userId: props.userData.id
            }
            try{
                let res = await axiosForAPI.delete(process.env.REACT_APP_API_CREATE_INTERESTED_EVENT_ENDPOINT, { data: data });
                //update the store
                props.updateEvent(props.event.id)
            }
            catch(error){
                console.log(error)
            }
            
        }
        else{
            const data = {
                ...props.event,
                userId: props.userData.id
            }
            try {
                let res = await axiosForAPI.post(process.env.REACT_APP_API_CREATE_INTERESTED_EVENT_ENDPOINT, data);
                //update the store
                props.updateEvent(props.event.id)
            } catch (error) {
                console.log(error)
            }
        }

        

        //update local event state
        setIsInterested(!isInterested);
        

    }
    return ( 
        <button className="interestedBtn"
        onClick={handleClick}
        >
          {isInterested ? <StarFilled /> : <StarOutlined />} Interested
        </button>
    );
}

const mapStateToProps = (state) =>{
    return{
        userData: state.userData   
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateEvent: (eventId) => dispatch({type: 'UPDATE_EVENT_INTERESTED', val: eventId})
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(InterestedButton);