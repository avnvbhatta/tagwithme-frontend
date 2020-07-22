import React, { useEffect, useState } from 'react';
import { Tabs, Modal } from 'antd';
import axiosForAPI from "../../utils/axiosForAPI";
import {  LoadingOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
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
    const [visible, setVisible] = useState(false);
    let userid = null;
    try {
        userid = props.userid;
    } catch (error) {
        userid = props.userData.id
    }

    useEffect(() => {
        axiosForAPI.get(`${process.env.REACT_APP_API_GET_FOLLOWERS_ENDPOINT}${userid}`).then(res=>{
                setFollowData({followers: res.data.followers, following: res.data.following});
                setIsLoading(false);
            }).catch(err => {
                if(err.response){
                    console.log(err.response)
                }
        }) 

    }, [isLoading, props.followers, props.following])

    const handleCancel = () => {
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    }

    return ( 
        <React.Fragment>
            {isLoading ? <LoadingOutlined /> :
                <div className="follow-container">
                    <div className="summary" onClick={showModal}>
                        <div className="followers">
                            {followData.followers ? followData.followers.length : 0} followers
                        </div>
                        <div className="following">
                            {followData.following ? followData.following.length : 0} following
                        </div>
    
                    </div>  
                    <Modal
                        visible={visible}
                        onCancel={handleCancel}
                        footer={null}
                        >
                        <Tabs defaultActiveKey="followers"  onChange={callback} style={{height: '40vh'}}>
                            <TabPane tab="Followers" key="followers">
                                <FollowList  className="followList" data={followData.followers} />
                            </TabPane>
                            <TabPane tab="Following" key="following">
                                <FollowList  className="followList"  data={followData.following} />
                            </TabPane>
                        </Tabs>
                    </Modal>                 
                </div>
            }
        </React.Fragment>
        
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