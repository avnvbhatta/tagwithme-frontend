import React from 'react';
import { useState, useEffect } from 'react';
import InterestedEvent from '../interestedevent/interestedevent';
import axiosForAPI from "../../utils/axiosForAPI";
import {connect} from "react-redux";

const MyEvents = (props) => {

    const [myEvents, setMyEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggleLike, setToggleLike] = useState(false);
    const [addingComment, setAddingComment] = useState(false);

    useEffect(() => { 
          const getInterestedEvents = async () =>{
            let res = await axiosForAPI.get(`${process.env.REACT_APP_API_GET_INTERESTED_EVENTS_ENDPOINT}${props.user_id}`);
            const interestedEvents = await res.data;
    
            setMyEvents(interestedEvents);
            setIsLoading(false);
          }
          getInterestedEvents();
          
    }, [toggleLike, addingComment]);

    return ( 
        <div>
            <h1>My Events</h1>
            <InterestedEvent events={myEvents} setAddingComment={setAddingComment} setToggleLike={setToggleLike}/>
        </div>
     );
}

const mapStateToProps = (state) => {
    return{
        user_id: state.userData.id
    }
}
 
export default connect(mapStateToProps)(MyEvents);