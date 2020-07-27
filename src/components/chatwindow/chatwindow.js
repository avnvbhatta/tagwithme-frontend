import React from 'react';
import {connect} from "react-redux";
import { useState, useRef } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import { Input, List, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import "./chatwindow.scss"
import { useEffect } from 'react';
import socket from "../../utils/socketIO";
import moment from 'moment';



const ChatWindow = (props) => {
    const [msg, setMsg] = useState('');
    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const [chatData, setChatData] = useState([]);
    const [prevChatFetched, setPrevChatFetched] = useState(false);
    
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => { 
            elementRef.current.scrollIntoView() }
            );
        return <div ref={elementRef} />;
      };


    useEffect(() => {
        const getMessages = async () => {
            try {
                let res = await axiosForAPI.post(process.env.REACT_APP_GET_MESSAGES_ENDPOINT, {data: {sender_id: props.user_id, receiver_id: props.receiver_id}})
                setChatData(res.data);
                setPrevChatFetched(true);
            } catch (error) {
                console.log(error);
            }
            
        }
        getMessages();

    }, []);

    useEffect(() => {
        if(prevChatFetched){
            socket.on("FromAPI/message", data => {
                setChatData([...chatData, data]);
            });
        }
        
    }, [prevChatFetched])
    

    const sendMsg =  () => {
        try {
            let res = axiosForAPI.post(process.env.REACT_APP_SEND_MESSAGE_ENDPOINT, {data: {sender_id: props.user_id, receiver_id: props.receiver_id, message: msg}})
            setMsg('')
        } catch (error) {
            console.log(error)
        }
        
    }
    return ( 
        <div className="chat-container">
            <div className="chat-display">
                <List
                    dataSource={chatData}
                    bordered={false}
                    renderItem={chat => (
                        <List.Item className={parseInt(chat.sender_id) === props.user_id ? "right" : "left" }>
                            <div className="msg"><Tooltip title={moment(chat.timestamp).format("ddd, hh:mm a")}>{chat.message}</Tooltip></div>
                        </List.Item>
                    )}
                />
                <AlwaysScrollToBottom />
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