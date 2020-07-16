import React, { useEffect, useState } from 'react';
import { List, Tabs } from 'antd';
import axiosForAPI from "../../utils/axiosForAPI";
import {  LoadingOutlined, UserOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import "./followview.scss"

const { TabPane } = Tabs;
const FollowView = (props) => {

    const callback = (key) => {
        console.log(key);
    }

    const [isLoading, setIsLoading] = useState(true);
    const [followData, setFollowData] = useState(null);
    let userid = null;
    try {
        userid = props.userid;
    } catch (error) {
        userid = props.userData.id
    }
    

    useEffect(() => {
        axiosForAPI.get(`http://localhost:4000/get-followers/${userid}`).then(res=>{
                setFollowData({followers: res.data.followers, following: res.data.following});
                setIsLoading(false);
            }).catch(err => {
                if(err.response){
                    console.log(err.response)
                }
        }) 

    }, [isLoading])

    return ( 
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Followers" key="followers">
                {isLoading ? <LoadingOutlined /> : 
                    <List
                        dataSource={followData.followers}
                        renderItem={user => (
                            <List.Item className="list-item">
                                {console.log('user', user)}
                                {user.imgurl ? <img className="follower-img" src={`${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${user.imgurl}`} alt="avatar" /> : <UserOutlined style={{ fontSize: '50px' }}/>}
                                {user.name}
                            </List.Item>
                        )}
                    />
                }
            </TabPane>
            <TabPane tab="Following" key="following">
                {isLoading ? <LoadingOutlined /> : 
                        <List
                            dataSource={followData.following}
                            renderItem={user => (
                                <List.Item className="list-item">
                                     {console.log('user', user)}
                                    {user.imgurl ? <img className="follower-img" src={`${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${user.imgurl}`} alt="avatar" /> : <UserOutlined style={{ fontSize: '50px' }}/>}
                                    {user.name}
                                </List.Item>
                            )}
                        />
                    }
            </TabPane>
        </Tabs>
     );
}

const mapStateToProps = (state) => {
    return{
        followers: state.userData.followers,
        following: state.userData.following,
        userData: state.userData
    }
}
 
export default connect(mapStateToProps)(FollowView);