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