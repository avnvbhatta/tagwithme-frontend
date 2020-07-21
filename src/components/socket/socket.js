import React from 'react';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { message, Button } from 'antd';
import 'antd/dist/antd.css';
import socketIOClient from 'socket.io-client';
import {connect} from "react-redux";


const SocketComponent = (props) => {

    const [res, setRes] = useState(null);
    const socket = socketIOClient('ENDPOINT HERE');

    useEffect(()=>{
        console.log(props.user_id)
        socket.emit('data', props.user_id)
        socket.on("FromAPI", data => {
          console.log("socket response ", data)
          setRes(data);
        });

    }, [])

    useEffect(() => {
        console.log('ue2')

        if(res !== null){
            message.info("your id is"+res);
        }
    }, [res])

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