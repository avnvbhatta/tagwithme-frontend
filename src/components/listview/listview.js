import React from 'react';
import 'antd/dist/antd.css';
import { List, Space, Avatar } from 'antd';
import {  DollarTwoTone, CalendarTwoTone, CarTwoTone, EnvironmentOutlined, EnvironmentTwoTone } from '@ant-design/icons';
import InterestedButton from '../button/interested';
import {connect} from "react-redux"
import "./listview.scss";

const ListView = (props) =>{

    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );

    const onAddressClick = (event) => {
        // console.log(event)
    }

    return(
        <List
            className="eventlist"
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 10,
            }}
            dataSource={props.events}
            renderItem={myEvent => (
                <List.Item
                    key={myEvent.id}
                    actions={[
                        <IconText icon={CalendarTwoTone} text={`${myEvent.startDate} @ ${myEvent.startTime}`} key="list-vertical-star-o" />,
                        <IconText icon={CarTwoTone} text={`${myEvent.distance}`} key="list-vertical-message" />,
                        <IconText icon={DollarTwoTone} text={`${myEvent.priceRange}`} key="list-vertical-like-o" />,
                        
                    ]}
                    extra={
                        <img
                        width={272}
                        alt="logo"
                        src={myEvent.images}
                    /> 
                    }
                >
                    <List.Item.Meta
                    avatar={<InterestedButton event={myEvent}/>}
                    title={<div><a href={myEvent.url} target="_blank">{myEvent.name} </a></div> }
                    description={
                    <div className="event-details">
                        <div className="event-venue">
                            {myEvent.venue}
                        </div>
                        <div className="event-address" onClick={() => onAddressClick(myEvent)}>
                            <IconText icon={EnvironmentTwoTone}  text={`${myEvent.address}, ${myEvent.city}, ${myEvent.state}, ${myEvent.postalCode}`}
                            key="list-vertical-like-o" />
                        </div>
                        
                        
                    </div>}
                    />
                    
                </List.Item>
            )}
            
        />
    )
}

const mapStateToProps = (state) =>{
    return {
        events: state.events
    }
}


export default connect(mapStateToProps)(ListView);