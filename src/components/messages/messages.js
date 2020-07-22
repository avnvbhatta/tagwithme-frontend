import React from 'react';
import {connect} from "react-redux";
import { useState } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ChatWindow from '../chatwindow/chatwindow';


const Messages = (props) => {
    const [msg, setMsg] = useState('');
    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const sendMsg =  () => {
        //  let res = axiosForAPI.post('http://localhost:4000/send-message', {data: {sender_id: props.user_id, receiver_id: 2, message: msg}})
        console.log({data: {sender_id: props.user_id, receiver_id: 2, message: msg}});
        setMsg('')
    }

    return ( 
        <ChatWindow />
     );
}
 

const mapStateToProps = (state) => {
    return{
        user_id: state.userData.id
    }
}
export default connect(mapStateToProps)(Messages);