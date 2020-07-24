import React from 'react';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import socket from "../../utils/socketIO";



const SocketComponent = (props) => {

    const [res, setRes] = useState(null);
    const [newNotificationAlert, setNewNotificationAlert]  = props.newNotificationAlert;

    useEffect(()=>{
        if(props.user_id){
            socket.emit('user_id', props.user_id)
            socket.on("FromAPI", data => {
              setRes(null);
              setRes(data);
              setNewNotificationAlert(true);
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