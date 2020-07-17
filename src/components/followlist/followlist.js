import React from 'react';
import { List } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import "./followlist.scss";
import FollowButton from '../button/follow';
import { useHistory, Link } from "react-router-dom";



const FollowList = (props) => {
    const history = useHistory();


    return ( 
        <List
            dataSource={props.data}
            renderItem={user => (
                <List.Item className="list-item">
                    <div className="follower-img-container">
                        <div>
                            {user.imgurl ? <img className="follower-img" src={`${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${user.imgurl}`} alt="avatar" /> : <UserOutlined style={{ fontSize: '25px' }}/>}
                        </div>
                        <div className="username">{user.name}</div>
                    </div>
                    <FollowButton className="follower-btn" fromFollowList={true} userData={user}/>
                </List.Item>
            )}
        /> 
    );
}
 
export default FollowList;