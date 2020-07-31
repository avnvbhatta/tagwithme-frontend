import React, { createElement, useEffect, useState } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import { Select, Space, Comment, Tooltip, Avatar, Input  } from 'antd';
import moment from 'moment';
import { LoadingOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, UserOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import "./globalfeed.scss";
import InterestedButton from '../button/interested';
import FollowButton from '../button/follow';
import { useHistory, Link } from "react-router-dom";



const { Option } = Select;
const { TextArea } = Input;


const GlobalFeed = (props) => {
    const [radius, setRadius] = useState('5');
    const [isLoading, setIsLoading] = useState(true);
    const [globalEvents, setGlobalEvents] = useState(null);
    const history = useHistory();

    const handleChange = (value) => {
        setRadius(value);
    }

    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);
    const [showCommentInput, setShowCommentInput] = useState(null);
    const [comment, setComment] = useState(null);
    const [addingComment, setAddingComment] = useState(false);
    

    const like = (event) => {
        let data = {
            liker_id: props.userId,
            user_id: event.userid,
            event_id: event.id,
            increment:  event.like_user_id.includes(props.userId)  ? false : true
        }
        axiosForAPI.put(process.env.REACT_APP_UPDATE_LIKES_ENDPOINT, data).then(res => {
        })
    };

    const toggleCommentInput = (event) => {
        if(showCommentInput){
            setShowCommentInput(null);
        }
        else{
            setShowCommentInput(event)
        }
    }

    const addComment = () =>{
        setAddingComment(true);
        const data = {
            user_id: showCommentInput.userid,
            event_id: showCommentInput.id,
            author_id: props.userId,
            comment: comment
        }
        
        axiosForAPI.post(process.env.REACT_APP_ADD_COMMENT_ENDPOINT, data).then(res => {
            setAddingComment(false);
        })

    }

    const handleTextAreaChange = (e) => {
        setComment(e.target.value);
    }

         
    useEffect(()=>{
        const data = {
            userId: props.userId,
            lat: props.lat,
            lng: props.lng,
            radius: radius
        }
        axiosForAPI.post(process.env.REACT_APP_API_GET_GLOBAL_FEED_EVENTS_ENDPOINT, data).then(res => {
            console.log(res.data)
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
                        actions={
                            [  
                                <Tooltip key="comment-basic-like" title="Like">
                                <span onClick={() => like(event)}>
                                    {event.like_user_id.includes(props.userId)  ? <LikeFilled style={{color: "dodgerblue"}}/> : <LikeOutlined/>}
                                    <span className="comment-action">{event.likes}</span>
                                </span>
                                </Tooltip>,
                                <span key="comment-basic-reply-to" onClick={() => toggleCommentInput(event)}>Comment</span>,
                                <InterestedButton event={event}/>,
                                <FollowButton event={event} fromGlobal={true}/>
                            
                            ]}
                        author={<div><Link to={`/profile/${event.userid}`}>{event.username}</Link></div>}
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
                                {event === showCommentInput && <div className="comment-area">
                                    <TextArea rows={1} autoSize allowClear onChange={handleTextAreaChange}/>
                                    <button className="my-btn" onClick={addComment}>{addingComment ? <LoadingOutlined /> : "Add Comment"}</button>
                                </div>
                                }
                                
                            </div>
                        }
                        datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(event.timestamp).fromNow()}</span>
                        </Tooltip>
                        }
                        
                    >
                        {event.comments && event.comments.map(comment => {
                            return <Comment
                            key={comment.created_at}
                                author={<div><Link to={`/profile/${comment.author_id}`}>{comment.author_name}</Link></div>}
                                avatar={
                                <Avatar
                                    src={comment.author_imgurl ? `${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${comment.author_imgurl}` : ""}
                                    icon={comment.author_imgurl  ? "" :<UserOutlined />}
                                    alt={comment.author_name}
                                />
                                }
                                content={
                                <p>
                                    {comment.comment}
                                </p>
                                }
                                datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(comment.created_at).fromNow()}</span>
                                </Tooltip>
                                }
                            />
                                
                        }) }
                    </Comment>

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