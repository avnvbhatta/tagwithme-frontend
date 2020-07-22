import React from 'react';
import {connect} from "react-redux";
import { useState } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import { Input, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import "./chatwindow.scss"
import { useEffect } from 'react';

const ChatWindow = (props) => {
    const [msg, setMsg] = useState('');
    const receiverData = props.userData;
    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const [chatData, setChatData] = useState([
        {
            sender_id: 1,
            receiver_id: 2,
            message: 'Hey Binish!',
            timestamp: '2020-07-22 09:14:55'
        },
        {
            sender_id: 2,
            receiver_id: 1,
            message: 'Hey Abhinav! Long time!',
            timestamp: '2020-07-22 09:15:55'
        },
        {
            sender_id: 1,
            receiver_id: 2,
            message: 'Iam doing well. Just thought you would know that you are a great person and this is a really long text!',
            timestamp: '2020-07-22 09:14:55'
        }
    ])
    

    useEffect(() => {
        console.log('here')
    }, [chatData]);

    const sendMsg =  () => {
          let res = axiosForAPI.post('http://192.168.1.124:4000/send-message', {data: {sender_id: props.user_id, receiver_id: 2, message: msg}})
        console.log({data: {sender_id: props.user_id, receiver_id: receiverData.id, message: msg}});
        let tempData = {sender_id: props.user_id, receiver_id: receiverData.id, message: msg};
        let newData = [...chatData, tempData]
        setChatData(newData);
        setMsg('')
    }

    return ( 
        <div className="chat-container">
            <div className="chat-display">
                <List
                    dataSource={chatData}
                    bordered={false}
                    renderItem={chat => (
                        <List.Item className={chat.sender_id === props.user_id ? "right" : "left" }>
                            <div className="msg">{chat.message}</div>
                        </List.Item>
                    )}
                />
            </div>
            <Input
                className="chat-input"
                placeholder="Write a message"
                size="large"
                onChange={handleChange}
                value={msg}
                suffix={<SendOutlined style={{fontSize: 16, color: '#1890ff'}} onClick={sendMsg}/> }
                onPressEnter={sendMsg}
            /> 
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        user_id: state.userData.id
    }
}
export default connect(mapStateToProps)(ChatWindow);