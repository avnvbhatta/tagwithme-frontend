import React, { useEffect, useState, useHistory } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import {connect} from "react-redux";
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { List, Avatar, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import "./notifications.scss";
import NotificationDetail from "./notificationdetail";
import moment from 'moment';



const Notifications = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [notificationData, setNotificationData] = useState([]);
    // const history = useHistory();


    useEffect(() => {
        const getNotifications = async () => {
            let res = await axiosForAPI.post(process.env.REACT_APP_GET_NOTIFICATIONS_ENDPOINT, {user_id: props.user_id})
            setNotificationData(res.data);
            setIsLoading(false);
        }
        getNotifications();
    }, [])

    const getSpecificNotif = (notification) => {
        if(notification.type === 'follow'){
        return <div><Link to={`/profile/${notification.sender_id}`}>{notification.sender_name}</Link> followed you.</div> ;
        }
        else if(notification.type === 'like'){
            return <div><Link to={`/profile/${notification.sender_id}`}>{notification.sender_name}</Link> liked your post.</div> ;
        }
        else if(notification.type === 'comment'){
            return <div><Link to={`/profile/${notification.sender_id}`}>{notification.sender_name}</Link> commented on your post.</div> ;

        }
    }
    
    return ( 
        <div className="notifications-container">
            {isLoading ? <LoadingOutlined /> : 
            
            <List
                itemLayout="horizontal"
                dataSource={notificationData}
                renderItem={notification => (

                    <Link to={notification.type === 'follow' ? `/profile/${notification.sender_id}` : `/notificationdetail/${notification.event_id}`}>
                        <List.Item>
                            <List.Item.Meta
                            bordered
                            avatar={
                                <Avatar
                                src={notification.sender_imgurl ? `${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${notification.sender_imgurl}` : ""}
                                icon={notification.sender_imgurl ? "" :<UserOutlined />}
                                alt={notification.sender_name}
                                /> 
                             }
                            title={getSpecificNotif(notification)}

                            description={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment(notification.created_at).fromNow()}</span>
                                </Tooltip>
                            }
                            />
                        </List.Item>
                    </Link>
                
                )}
            />
            
            }
        </div> 
    );
}
 
const mapStateToProps = (state) => {
    return{
        user_id: state.userData.id
    }
}
export default connect(mapStateToProps)(Notifications);