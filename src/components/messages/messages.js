import React, { useEffect } from 'react';
import {connect} from "react-redux";
import { useState } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import {  List } from 'antd';
import {  UserOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from "moment";
import "./messages.scss";
import ChatDrawer from '../chatdrawer/chatdrawer';
import socket from "../../utils/socketIO";


const Messages = (props) => {
    const [chatUsers, setChatUsers] = useState([]);
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const showDrawer = (user) => {
        setActiveChatUser(user);
        setDrawerVisible(true);
      };
    
    const onClose = () => {
        setDrawerVisible(false);
        setActiveChatUser(null);
    };

    const [initialMessagesFromDBFetched, setInitialMessagesFromDBFetched] = useState(false);

    //Use effect to dynamically update with latest message from chat
    useEffect(() => {
        if(initialMessagesFromDBFetched){
            socket.on("FromAPI/message", data => {
                let newData = chatUsers.map(el => {
                    if(el.id == parseInt(data.sender_id))
                       return Object.assign({}, el, {message: data.message, timestamp: data.timestamp})
                    return el
                });
                newData = newData.sort(function(a,b){
                    return new Date(b.timestamp) - new Date(a.timestamp);
                  });
                setChatUsers(newData);

            });
        }
        
    }, [initialMessagesFromDBFetched])

    
    useEffect(()=>{
        const getChatUsers = async () => {
            try {
                let res = await axiosForAPI.post(process.env.REACT_APP_GET_CHAT_USERS_ENDPOINT, {data: {sender_id: props.user_id}})
                setChatUsers(res.data);
                setIsLoading(false);
                setInitialMessagesFromDBFetched(true);
            } catch (error) {
                console.log(error);
            }
            
        }
        getChatUsers();
    }, [])

    return ( 
        <React.Fragment>
            {isLoading ? <LoadingOutlined /> : 
            <div className="messages-container">
                <List 
                    itemLayout="horizontal"
                    dataSource={chatUsers}
                    renderItem={user => (
                    <List.Item onClick={() => showDrawer(user)} className="list-item">
                        <List.Item.Meta
                            avatar={user.imgurl ? <img className="follower-img" src={`${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${user.imgurl}`} alt="avatar" /> : <UserOutlined style={{ fontSize: '25px' }}/>}
                            title={<div className="chatTitle"> <div className="userName">{user.name}</div> <div className="timestamp">{moment(user.timestamp).format("ddd, hh:mm a")}</div></div> } 
                            description={user.message}
                        />
                    </List.Item>
                    )}
                />
                {activeChatUser && 

                    <ChatDrawer userData={activeChatUser} drawerVisible={drawerVisible} onClose={onClose}/>

                }
                 
            </div>
            
            
            }
        </React.Fragment>
           
        );
}
 

const mapStateToProps = (state) => {
    return{
        user_id: state.userData.id,
    }
}
export default connect(mapStateToProps)(Messages);