import React from 'react';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { message, Button } from 'antd';
import 'antd/dist/antd.css';
import socketIOClient from 'socket.io-client';
import {connect} from "react-redux";


const SocketComponent = (props) => {

    const [res, setRes] = useState(null);
    const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_ENDPOINT);
    const [newNotificationAlert, setNewNotificationAlert]  = props.newNotificationAlert;

    useEffect(()=>{
        if(props.user_id){
            socket.emit('data', props.user_id)
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