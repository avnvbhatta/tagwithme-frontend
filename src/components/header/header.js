import React from 'react';
import "./header.scss";

const Header = () => {
    return ( 
        <div className="header">
            <div className="appLogo"></div>
            <div className="notifProfile">
                <div className="notification"></div>
                <div className="profile"></div>
            </div>
            
        </div>
     );
}
 
export default Header;