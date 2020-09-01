import React, {  useState } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import { Comment, Tooltip, Avatar, Input,   } from 'antd';
import moment from 'moment';
import { LoadingOutlined, LikeOutlined, LikeFilled, UserOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import "./interestedevent.scss";
import InterestedButton from '../button/interested';
import FollowButton from '../button/follow';
import { useHistory, Link } from "react-router-dom";
import InterestedEventComment from './interestedeventcomment';

const { TextArea } = Input;
const InterestedEvent = (props) => {
    const history = useHistory();

    const events = props.events;

    const [toggleLike, setToggleLike] = useState(false);
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
            props.setToggleLike(!toggleLike);
        })
    };

    
    const addComment = (event) =>{
        props.setAddingComment(true);
        setAddingComment(true);
        
        const data = {
            user_id: event.userid,
            event_id: event.id,
            author_id: props.userId,
            comment: comment
        }
        
        axiosForAPI.post(process.env.REACT_APP_ADD_COMMENT_ENDPOINT, data).then(res => {
            props.setAddingComment(false);
            setAddingComment(false);
            setComment('');

        })
    }

    const handleTextAreaChange = (e) => {
        setComment(e.target.value);
    }


    return ( 
        <React.Fragment>
            {events.map(event => {
                return <Comment
                    style={{background: 'white', padding: '8px 48px 8px 8px', borderRadius: '8px', marginBottom: '12px'}}
                    key={`${event.timestamp}`}
                    actions={
                        [  
                            <Tooltip key="comment-basic-like" color={'dodgerblue'} title="Like">
                            <span onClick={() => like(event)}>
                                {event.like_user_id.includes(props.userId)  ? <LikeFilled style={{color: "dodgerblue"}}/> : <LikeOutlined/>}
                                <span className="comment-action">{event.likes}</span>
                            </span>
                            </Tooltip>,
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
                        </div>
                    }
                    datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(event.timestamp).fromNow()}</span>
                    </Tooltip>
                    }
                    
                >
                    <div className="comment-area">
                        <TextArea rows={1} autoSize style={{marginBottom: "8px"}} allowClear onChange={handleTextAreaChange} value={comment} placeholder="Write a comment..."/>
                        {comment && <button className="my-btn"  onClick={() => addComment(event)}>{addingComment ? <LoadingOutlined /> : "Add Comment"}</button>}
                    </div>

                    <InterestedEventComment comments={event.comments}/>
                    
                </Comment>
            })}
        </React.Fragment>
     );
}
 
const mapStateToProps = (state) => {
    return{
        userId: state.userData.id,
        
    }
}

export default connect(mapStateToProps)(InterestedEvent);
