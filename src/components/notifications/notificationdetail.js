import React, { useEffect, useState } from 'react';
import {connect} from "react-redux";
import axiosForAPI from "../../utils/axiosForAPI";
import InterestedEvent from '../interestedevent/interestedevent';
import { LoadingOutlined } from '@ant-design/icons';

const NotificationDetail = (props) => {
    const event_id = (props.match.params.event_id);
    const [interestedEvent, setInterestedEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [toggleLike, setToggleLike] = useState(false);
    const [addingComment, setAddingComment] = useState(false);

    useEffect(() => {
        let data = {
            user_id: props.user_id,
            event_id: event_id,
        }
        axiosForAPI.post(process.env.REACT_APP_GET_INTERESTED_EVENT_ENDPOINT, data).then(res => {
            setInterestedEvent(res.data);
            setIsLoading(false);
        })
    }, [addingComment, toggleLike])
    return ( 
        <div style={{ padding: '10px', height: '100vh', overflow: 'auto'}} >
            {isLoading ? <LoadingOutlined /> :
                <InterestedEvent events={interestedEvent} setAddingComment={setAddingComment} setToggleLike={setToggleLike} />
            }
        </div>
     );
}

const mapStateToProps = (state) => {
    return{
        user_id: state.userData.id
    }
}
 
export default connect(mapStateToProps)(NotificationDetail);