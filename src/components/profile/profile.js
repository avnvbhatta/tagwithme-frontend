import React, { useContext } from "react"
import "./profile.scss"
// import * as Vibrant from 'node-vibrant'
// import { getVibrantColors } from "../../utils/utils";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, EnvironmentOutlined } from '@ant-design/icons';
import MessageButton from '../button/message';
import { UserContext } from "../../utils/usercontext";
import { Spin, Space } from 'antd';

const Profile = (props) => {
    //Get global user from context to display data
    const {user} = useContext(UserContext);
    return ( 
        <div>
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="userImg" >
                        <img  src={"./abhinav.png"} alt=""/>
                    </div>
                    <div className="userDetails">
                        {user ? <div className="userName">{`${user.userData.id} ${user.userData.name} ${user.userData.email}`}</div> : <Space size="middle"><Spin /></Space>}
                        
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
 
export default Profile;
