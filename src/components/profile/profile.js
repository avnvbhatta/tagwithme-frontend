import React from "react"
import "./profile.scss"
import * as Vibrant from 'node-vibrant'
import { getVibrantColors } from "../../utils/utils";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, EnvironmentOutlined } from '@ant-design/icons';

const Profile = (props) => {
    return ( 
        <div>
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="userImg" >
                        <img  src={"./abhinav.png"} alt=""/>
                    </div>
                    <div className="userDetails">
                        <div className="userName">Binish Koirala</div>
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
                            <button>Message</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
export default Profile;
