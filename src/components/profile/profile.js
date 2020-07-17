import React, {useState, useEffect} from "react"
import "./profile.scss"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, EnvironmentOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import MessageButton from '../button/message';
import { Spin, Space, Avatar } from 'antd';
import {connect} from "react-redux";
import ImgUpload from "../imgupload/imgupload";
import axiosForAPI from "../../utils/axiosForAPI";
import FollowButton from "../button/follow";
import FollowView from "../followview/followview";

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
    useEffect(()=>{
        const getData = async () =>{
            try {
                let res = await axiosForAPI.get(`http://localhost:4000/users/${userid}`);
                setUserData(res.data)
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
                        {userData ? <div className="userName">{userData.name}</div> : <Space size="middle"><Spin /></Space>}
                        
                        <div className="userLocation">
                            <EnvironmentOutlined />
                            <div>Des Moines, IA</div>
                            
                        </div>
                        <div className="userSocial">
                            <FacebookOutlined className="userSocialIcons"/>
                            <TwitterOutlined className="userSocialIcons"/>
                            <InstagramOutlined className="userSocialIcons"/>
                        </div>
                        <div className="messageUser">
                            {isOwnProfile && !isLoading? "" : <MessageButton />}
                            {isOwnProfile && !isLoading? "" : <FollowButton userData={userData} fromProfile={true}/>}
                        </div>
                        
                        
                    </div>
                </div>
                <div className="follows">
                    <FollowView isOwnProfile={isOwnProfile} userid={userid}/>
                </div>
            
        </div>
        }
            
        </div>
    );
}
 
const mapStateToProps = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(mapStateToProps)(Profile);
