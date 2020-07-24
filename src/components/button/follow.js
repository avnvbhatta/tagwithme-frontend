import React, { useState} from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import "./follow.scss";
import {connect} from "react-redux";
import axiosForAPI from "../../utils/axiosForAPI";


const Follow = (props) => {
    let id = null;
    let name = null;
    let imgurl = null;

    if(typeof props.fromFollowList !== 'undefined' && props.fromFollowList === true){
        id = props.userData.id;
        name = props.userData.name;
        imgurl = props.userData.imgurl;
    }
    else if(typeof props.fromGlobal !== 'undefined' && props.fromGlobal === true){
        id = props.event.userid.toString();
        name = props.event.username;
        imgurl = props.event.imgurl;
    }
    else if(typeof props.fromProfile !== 'undefined'  && props.fromProfile === true){
        id = props.userData.id;
        name = props.userData.name;
        imgurl = props.userData.imgurl;
    }

    const [followLabel, setFollowLabel] = useState(null);

    const handleClick = async () =>{
        const user_id = props.user_id
        
        if(props.followingSet.has(parseInt(id))){
            let res = await axiosForAPI.delete(process.env.REACT_APP_API_FOLLOW_ENDPOINT, {data: {user_id: user_id, following_id: id}} );
            props.unfollow(id);
            setFollowLabel('Follow')
        }
        else{
            let res = await axiosForAPI.post(process.env.REACT_APP_API_FOLLOW_ENDPOINT, {user_id: user_id, following_id: id});
            props.follow({id: id, name: name, imgurl: imgurl});
            setFollowLabel('Following')

        }
    }

    

    //Don't render your own follow button 
    if(id == props.user_id){
        return <div></div>
    }
    return ( 
        <button className={props.followingSet.has(parseInt(id)) ? "my-btn unfollow" : "my-btn"}
            onClick={handleClick}
        >
          <UserAddOutlined /> <div>{props.followingSet.has(parseInt(id)) ? "Following" : "Follow"}</div>
        </button>
    );
}
 
const mapStateToProps = (state) => {
    return{
        followingSet: state.userData.followingSet,
        user_id: state.userData.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        unfollow: (id) => dispatch({type: 'UNFOLLOW', val: id}),
        follow: (id) => dispatch({type: 'FOLLOW', val: id}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Follow);