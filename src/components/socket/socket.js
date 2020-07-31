import React from 'react';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import socket from "../../utils/socketIO";



const SocketComponent = (props) => {

    const [res, setRes] = useState(null);
    const [newGenericNotificationAlert, setNewGenericNotificationAlert]  = props.newGenericNotificationAlert;
    const [newMessageNotificationAlert, setNewMessageNotificationAlert]  = props.newMessageNotificationAlert;


    useEffect(()=>{
        if(props.user_id){
            socket.emit('user_id', props.user_id)
            socket.on("FromAPI/newGeneralNotification", data => {
                setRes(null);
              setRes(data);
              setNewGenericNotificationAlert(true);
            });

            socket.on("FromAPI/newMessageNotification", data => {
                setRes(null);
              setRes(data);
              setNewMessageNotificationAlert(true);
            });
            
        }

    }, [props.user_id])

 

    return ( 
        <Fragment>
        </Fragment>
    );
}
 

const mapStateToProps = (state) => {
    return {
        user_id: state.userData.id
    }
}
export default connect(mapStateToProps)(SocketComponent);