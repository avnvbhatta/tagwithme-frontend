import React from 'react';
import InterestedButton from '../button/interested';
import "./popup.scss"
import { Card, Avatar, Space} from "antd"
import {  DollarTwoTone, CalendarTwoTone, CarTwoTone, CloseOutlined, StarOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Popup = ({ feature, popUpRef }) => {
  const { id, title } = feature.properties;
  const  event  = JSON.parse(feature.properties.event);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  
  const closeCard = () => {
    popUpRef.current.remove();
  }

  return (
    <div className="popup-container">
      <Card
        style={{ width: 220 }}
        hoverable
        cover={          
          <img
            alt="example"
            src={event.images ? event.images : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
          />
        }
        actions={[
          <InterestedButton event={event}/>,
          <CloseOutlined onClick={closeCard}/>,

        ]}
      >
        <Meta
          title={<a href={event.url} target="_blank">{event.name} </a>}
          description={
            <div className="event-info">
              <p>
                {`${event.venue}, 
                ${event.address}, ${event.city}, ${event.state}, ${event.postalCode}`}
              </p>
              <IconText icon={CalendarTwoTone} text={`${event.startDate} @ ${event.startTime}`} key="list-vertical-star-o" />
              <IconText icon={CarTwoTone} text={`${event.distance}`} key="list-vertical-message" />
              <IconText icon={DollarTwoTone} text={`${event.priceRange}`} key="list-vertical-like-o" />
            </div>
          
        
        }
        />
      </Card>
      
    </div>
  );
};


export default Popup;
