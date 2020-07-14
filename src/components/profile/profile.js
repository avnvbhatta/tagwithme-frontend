import React from "react"
import "./profile.scss"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, EnvironmentOutlined } from '@ant-design/icons';
import MessageButton from '../button/message';
import { Spin, Space } from 'antd';
import {connect} from "react-redux";

const Profile = (props) => {
    return ( 
        <div>
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="userImg" >
                        <img  src={"./abhinav.png"} alt=""/>
                    </div>
                    <div className="userDetails">
                        {props.userData ? <div className="userName">{`${props.userData.name}`}</div> : <Space size="middle"><Spin /></Space>}
                        
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
                            <MessageButton />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
const mapStateToProps = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(mapStateToProps)(Profile);
