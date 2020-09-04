import React, {useState, useEffect} from "react"
import "./profile.scss"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, EnvironmentOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import MessageButton from '../button/message';
import EditProfileButton from '../button/editprofile';

import { Avatar } from 'antd';
import {connect} from "react-redux";
import ImgUpload from "../imgupload/imgupload";
import axiosForAPI from "../../utils/axiosForAPI";
import FollowButton from "../button/follow";
import FollowView from "../followview/followview";
import socket from "../../utils/socketIO";
import MyEvents from "./myevents";


const Profile = (props) => {

    let userid = null;
    const isOwnProfile = props.match.params.userid ? false : true;
    if(isOwnProfile){
        userid = props.userData.id;
    }
    else{
        userid =  props.match.params.userid; 
    }
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        socket.on("isOnline", data => {
            setIsOnline(data);
        })
    }, [isOnline])

    useEffect(() => {
    }, [props.city, props.state, props.userData])

    useEffect(()=>{
        const getData = async () =>{
            try {
                let res = await axiosForAPI.get(`${process.env.REACT_APP_API_GET_USER_BY_ID_ENDPOINT}${userid}`);
                setUserData(res.data);
                if(isOwnProfile){
                    socket.emit("isOnline", userid);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
            
        }
        getData();
        
    }, [])

    if(!userData){
        return <h1>User not found.</h1>
    }
    return ( 
        <div>
            {
            isLoading ? <LoadingOutlined /> : 
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="userImg" >
                        {isOwnProfile ? <ImgUpload /> : <> {userData.imgurl? <img src={`${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${userData.imgurl}`} alt="avatar"  /> :<Avatar size={64} icon={<UserOutlined />} /> } </>
                        }
                    </div>
                    <div className="userDetails">
                        <div className="userName">
                            <div className="name">{userData.name}</div>
                            <div className={`online-status ${isOnline ? "online" : "offline"}`}></div>
                            {isOwnProfile && <EditProfileButton className="my-btn" userData={userData}/>}

                        </div> 
                        
                        <div className="userLocation">
                            <EnvironmentOutlined />
                            <div>{!props.city && !props.state ? "USA" : `${props.city ? props.city : ""}${props.city && props.state ? ", " : ""} ${props.state ? props.state : ""}` }</div>
                        </div>
                        
                        <div className="follows">
                            <FollowView isOwnProfile={isOwnProfile} userid={userid}/>
                        </div>
                        
                        {
                            isOwnProfile && !isLoading? "" :
                                <div className="messageUser">
                                    <MessageButton className="msgBtn" userData={userData}/>
                                    <FollowButton className="followBtn" userData={userData} fromProfile={true}/>
                                </div>
                        }
                        
                        
                        
                    </div>
                </div>
                <div>
                    <MyEvents userid={userid} username={userData.name}/>
                </div>
               
            
        </div>
        }
            
        </div>
    );
}
 
const mapStateToProps = (state) => {
    return{
        userData: state.userData,
        city: state.userData.city,
        state: state.userData.state
    }
}
export default connect(mapStateToProps)(Profile);
