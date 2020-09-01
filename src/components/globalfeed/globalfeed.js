import React, { useEffect, useState } from 'react';
import axiosForAPI from "../../utils/axiosForAPI";
import { Select, Space  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import "./globalfeed.scss";
import InterestedEvent from '../interestedevent/interestedevent';



const { Option } = Select;


const GlobalFeed = (props) => {
    const [radius, setRadius] = useState('5');
    const [isLoading, setIsLoading] = useState(true);
    const [globalEvents, setGlobalEvents] = useState(null);

    const handleChange = (value) => {
        setRadius(value);
    }

    const [toggleLike, setToggleLike] = useState(false);
    const [addingComment, setAddingComment] = useState(false);
    

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
    }, [radius, addingComment, toggleLike])

        

    return ( 
        <div className="globalFeedContainer">
            
            <Space className="radius-selector">
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

            <div className="commentsContainer">
                <InterestedEvent events={globalEvents} setAddingComment={setAddingComment} setToggleLike={setToggleLike}/>
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