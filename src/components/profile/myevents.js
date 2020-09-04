import React from 'react';
import { useState, useEffect } from 'react';
import InterestedEvent from '../interestedevent/interestedevent';
import axiosForAPI from "../../utils/axiosForAPI";
import {connect} from "react-redux";
import {Empty} from "antd";
import "./myevents.scss"
const MyEvents = (props) => {
    const [myEvents, setMyEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggleLike, setToggleLike] = useState(false);
    const [addingComment, setAddingComment] = useState(false);

    useEffect(() => { 
          const getInterestedEvents = async () =>{
            let res = await axiosForAPI.get(`${process.env.REACT_APP_API_GET_INTERESTED_EVENTS_ENDPOINT}${props.userid}`);
            const interestedEvents = await res.data;
            setMyEvents(interestedEvents);
            setIsLoading(false);
          }
          getInterestedEvents();
          
    }, [toggleLike, addingComment]);

    return (
        <React.Fragment>
            {
            myEvents.length > 0 ? 
            <div className="myevents-container commentsContainer">
                <h1 style={{width: "100%", maxWidth:"600px"}}>{props.userid === props.user_id ? "My Events" : `${props.username}'s Events`}</h1>
                <InterestedEvent events={myEvents} setAddingComment={setAddingComment} setToggleLike={setToggleLike}/>
            </div>  :
            <Empty
                
                description={`${props.username}'s events will appear here.`}
            >
            </Empty>
            }
          
        </React.Fragment> 
        
     );
}

const mapStateToProps = (state) => {
    return{
        user_id: state.userData.id
    }
}
 
export default connect(mapStateToProps)(MyEvents);