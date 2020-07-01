import React from 'react';
import 'antd/dist/antd.css';
import { List, Space } from 'antd';
import {  DollarTwoTone, CalendarTwoTone, CarTwoTone } from '@ant-design/icons';
import InterestedButton from '../button/interested';

const ListView = (props) =>{
    const [events] = props.events;
    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );
    
    return(
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 10,
            }}
            dataSource={events}
            
            renderItem={event => (
            <List.Item
                key={event.id}
                actions={[
                    <IconText icon={CalendarTwoTone} text={`${event.date.startDate} @ ${event.date.startTime}`} key="list-vertical-star-o" />,
                    <IconText icon={CarTwoTone} text={`${event.distance}`} key="list-vertical-message" />,
                    <IconText icon={DollarTwoTone} text={`${event.priceRange}`} key="list-vertical-like-o" />,
                    
                ]}
                extra={
                    <img
                    width={272}
                    alt="logo"
                    src={event.images[0].url}
                /> 
                }
            >
                <List.Item.Meta
                title={<a href={event.url}>{event.name}</a>}
                description={`${event.venue}, 
                ${event.address}, ${event.city.name}, ${event.state.stateCode}, ${event.postalCode}`}
                />
                <InterestedButton event={event}/>                
                
            </List.Item>
            
            )}
            
        />
    )
}


export default ListView;