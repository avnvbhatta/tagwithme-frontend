import React, { useEffect, useState } from 'react';
import { List, Tabs } from 'antd';
import axiosForAPI from "../../utils/axiosForAPI";
import {  LoadingOutlined, UserOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import "./followview.scss";
import FollowButton from '../button/follow';
import FollowList from "../followlist/followlist";


const { TabPane } = Tabs;
const FollowView = (props) => {

    const callback = (key) => {
        // console.log(key);
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

    }, [isLoading, props.followers, props.following])

    return ( 
        
        <div>
            {isLoading ? <LoadingOutlined /> :
                <div className="follow-container">
                    <div className="summary">
                        <div className="followers">{followData.followers ? followData.followers.length : 0} followers</div>
                        <div className="following">{followData.following ? followData.following.length : 0} following</div>
                    </div>
                    <Tabs className="detail" defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Followers" key="followers">
                            <FollowList data={followData.followers} />
                        </TabPane>
                        <TabPane tab="Following" key="following">
                            <FollowList data={followData.following} />
                        </TabPane>
                    </Tabs>
                </div>
            }
            
        </div>
        
     );
}

const mapStateToProps = (state) => {
    return{
        followers: state.userData.followers,
        following: state.userData.following,
        userData: state.userData,
        followingSet: state.userData.followingSet
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setFollowData: (data) => dispatch({type: 'SET_FOLLOW_DATA', val:data})
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FollowView);