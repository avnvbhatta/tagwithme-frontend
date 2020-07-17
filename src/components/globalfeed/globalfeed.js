import React, { createElement, useEffect, useState } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import { Select, Space, Comment, Tooltip, Avatar  } from 'antd';
import moment from 'moment';
import { LoadingOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, UserOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import "./globalfeed.scss";
import InterestedButton from '../button/interested';
import FollowButton from '../button/follow';
import { useHistory, Link } from "react-router-dom";



const { Option } = Select;

const GlobalFeed = (props) => {
    const [radius, setRadius] = useState('5');
    const [isLoading, setIsLoading] = useState(true);
    const [globalEvents, setGlobalEvents] = useState(null);
    const history = useHistory();

    const handleChange = (value) => {
        setRadius(value);
    }

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
        </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
            <span className="comment-action">{dislikes}</span>
        </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    useEffect(()=>{
        const data = {
            userId: props.userId,
            lat: props.lat,
            lng: props.lng,
            radius: radius
        }
        axiosForAPI.post(process.env.REACT_APP_API_GET_GLOBAL_FEED_EVENTS_ENDPOINT, data).then(res => {
            setGlobalEvents(res.data);
            setIsLoading(false);
        })
    }, [radius])

        

    return ( 
        <div className="globalFeedContainer">
            
            <Space>
                Show me events within
                <Select defaultValue="5" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="1">1 mile</Option>
                    <Option value="5">5 miles</Option>
                    <Option value="10">10 miles</Option>
                    <Option value="25">25 miles</Option>
                    <Option value="50">50 miles</Option>
                    <Option value="100">100 miles</Option>
                    <Option value="100000">No limit</Option>
                </Select>
            </Space>
            
            {isLoading ? <LoadingOutlined /> :

            <div>
                {globalEvents.map(event => {
                    return <Comment
                        key={`${event.timestamp}`}
                        actions={actions}
                        author={<Link to={`/profile/${event.userid}`}>{event.username}</Link>}
                        avatar={ 
                        <Avatar
                            src={event.imgurl ? `${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${event.imgurl}` : ""}
                            icon={event.imgurl ? "" :<UserOutlined />}
                            alt={event.username}
                            onClick={()=> history.push(`/profile/${event.userid}`)}
                        /> 
                        }
                        content={
                            <div>
                                <p>
                                    Going to {event.name} on {event.startdate} at {event.starttime}. 
                                </p>
                                <InterestedButton event={event}/>
                                <FollowButton event={event} fromGlobal={true}/>

                            </div>
                        }
                        datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(event.timestamp).fromNow()}</span>
                        </Tooltip>
                        }
                    />

                })}
            </div>
            }
        </div>
        
     )
}

const mapStateToProps = (state) => {
    return{
        userId: state.userData.id,
        imgurl: state.userData.imgurl,
        lat: state.lat,
        lng: state.lng,
        followingSet: state.userData.followingSet,
        following: state.userData.following
    }
}
 
export default connect(mapStateToProps)(GlobalFeed);