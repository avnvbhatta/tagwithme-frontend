import React from 'react';
import 'antd/dist/antd.css';
import { List, Space } from 'antd';
import {  DollarTwoTone, CalendarTwoTone, CarTwoTone } from '@ant-design/icons';
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
            
            renderItem={event => (
            
            <List.Item
                key={event.id}
                actions={[
                    <IconText icon={CalendarTwoTone} text={`${event.startDate} @ ${event.startTime}`} key="list-vertical-star-o" />,
                    <IconText icon={CarTwoTone} text={`${event.distance}`} key="list-vertical-message" />,
                    <IconText icon={DollarTwoTone} text={`${event.priceRange}`} key="list-vertical-like-o" />,
                    
                ]}
                extra={
                    <img
                    width={272}
                    alt="logo"
                    src={event.images}
                /> 
                }
            >
                <List.Item.Meta
                title={<a href={event.url} target="_blank">{event.name} </a>}
                description={`${event.venue}, 
                ${event.address}, ${event.city}, ${event.state}, ${event.postalCode}`}
                />
                <InterestedButton  event={event}/>                
                
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