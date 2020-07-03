import React, {useContext} from 'react';
import "./interested.scss";
import { Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { UserContext } from '../../utils/usercontext';
import Axios from "axios";


const InterestedButton = (props) => {
    const event = props.event;
    const { user } = useContext(UserContext);
    const handleClick = async () =>{
        const data = {
            ...event,
            userId: user.id
        }
        let res = await Axios.post(process.env.REACT_APP_API_CREATE_INTERESTED_EVENT_ENDPOINT, data);
        console.log(res);

    }
    return ( 
        <Button type="primary" shape="round" icon={<StarOutlined />} size={'large'}
        onClick={handleClick}
        >
          Interested
        </Button>
    );
}
 
export default InterestedButton;