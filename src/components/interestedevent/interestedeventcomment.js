import React from 'react';
import { Select, Space, Comment, Tooltip, Avatar, Input, Divider  } from 'antd';
import moment from 'moment';
import { LoadingOutlined, LikeOutlined, LikeFilled, UserOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom";

const InterestedEventComment = (props) => {
    const comments = props.comments;
    return ( 
        <React.Fragment>
            {comments && comments.map(comment => {
                        return <Comment
                            style={{background: '#F0F2F5', padding: '8px', borderRadius: '8px', marginBottom: '12px'}}
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
        </React.Fragment>
     );
}
 
export default InterestedEventComment;