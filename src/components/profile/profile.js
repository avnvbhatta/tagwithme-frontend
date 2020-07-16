import React, {useState, useEffect} from "react"
import "./profile.scss"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import MessageButton from '../button/message';
import { Spin, Space } from 'antd';
import {connect} from "react-redux";
import ImgUpload from "../imgupload/imgupload";
import axiosForAPI from "../../utils/axiosForAPI";
import FollowButton from "../button/follow";
import FollowView from "../followview/followview";

const Profile = (props) => {

    const userid = props.match.params.userid || props.userData.id;
    const ownProfile = props.match.params.userid ? false : true;
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    useEffect(()=>{
        //If viewing own profile, fetch data from store
        if(ownProfile){
            setUserData(props.userData);
            setIsLoading(false);
        }
        //If viewing other's profile, fetch data from DB
        else{
            axiosForAPI.get(`http://localhost:4000/users/${userid}`).then(res => {
                console.log('hit db')
                console.log(res.data)
                setUserData(res.data)
                setIsLoading(false);
            })
        }
        
    }, [isLoading])
    return ( 
        <div>
            {
            isLoading ? <LoadingOutlined /> : 
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="userImg" >
                        {ownProfile ? <ImgUpload /> : <img src={`${process.env.REACT_APP_API_GET_UPLOAD_ENDPOINT}${userData.imgurl}`} alt="avatar" style={{ width: '100%' }} />}
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
                        <div className="follow">
                            <div className="followers">{userData.followerCount ? userData.followerCount : 0} followers</div>
                            <div className="following">{userData.followingCount ? userData.followingCount : 0} following</div>
                        </div>
                        <div className="messageUser">
                            {ownProfile ? "" : <MessageButton />}
                            {ownProfile ? "" : <FollowButton followId={props.match.params.userid}/>}
                        </div>
                        
                        
                    </div>
                </div>
                <div className="follows">
                    <FollowView ownProfile={ownProfile} userid={userid}/>
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
