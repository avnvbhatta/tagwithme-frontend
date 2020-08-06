import React, { useState, useEffect } from 'react';
import "./eventsview.scss";
import axios from "axios";
import Search from "../search/search"
import ListView from '../listview/listview';
import MapView from '../mapview/mapview';
import { Tabs } from 'antd';
import { UnorderedListOutlined, EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { filterTicketMasterEvents } from "../../utils/utils"
import axiosForAPI from "../../utils/axiosForAPI"


const { TabPane } = Tabs;


const EventsView = (props) => {

  const [selectedTab, setSelectedTab] = useState('map');
  
  //hook to get user interested event to highlight already interested events
  useEffect(() => { 
    if(props.isLoggedIn){
      const getInterestedEvents = async () =>{
        let res = await axiosForAPI.get(`${process.env.REACT_APP_API_GET_INTERESTED_EVENTS_ENDPOINT}${props.userData.id}`);
        const interestedEvents = await res.data;

          let interestedSet = new Set();
          interestedEvents.map(event => {
            interestedSet.add(event.id);
          })  
          props.setInterestedEvents(interestedSet);
      }
      getInterestedEvents();
      
    }
   
}, [props.isLoggedIn]);

  

  //Get events from ticketmaster
  useEffect(() => {
    props.setEvents([])
    try {
      if (props.lat && props.lng) {
        const getTicketMasterEvents = async () => {
          const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
            params: {
              apikey: process.env.REACT_APP_TICKETMASTER_API_KEY,
              geoPoint: Math.round(props.lat) + "," + Math.round(props.lng),
              radius: 75,
              size: 75
            }
          });
          const eventsRes = await response.data._embedded.events;
          var uniqueEvents = eventsRes.filter(function({name}) {
            return !this[name] && (this[name] = name)
          }, {})
          const { eventsArray, geoJSONFeatureArray } = filterTicketMasterEvents(uniqueEvents, props.interestedEvents);
          props.setEvents(eventsArray);
          props.setGeoJSONFeatures(geoJSONFeatureArray);
        }
        getTicketMasterEvents();
      }
    }
    catch (error) {
      console.log("Encountered error while fetching events", error)
    }
  }, [props.interestedEvents, props.lng]);


  const handleTabClick = (key) => {
    setSelectedTab(key);
  }

  return (<div className="eventsContainer">
    <Search className="searchBar" />
    <Tabs defaultActiveKey={selectedTab} activeKey={selectedTab} onTabClick={handleTabClick} >
      <TabPane
        tab={
          <span>
            <EnvironmentOutlined />
                View On A Map
              </span>
        }
        key="map"
      >
        <MapView />
      </TabPane>
      <TabPane
        tab={
          <span>
            <UnorderedListOutlined />
                View In A List
              </span>
        }
        key="list"
      >
        <ListView setSelectedTab={setSelectedTab}/>
      </TabPane>
    </Tabs>
  </div>)
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    userData: state.userData,
    lat: state.lat,
    lng: state.lng,
    events: state.events,
    interestedEvents: state.interestedEvents,
    geoJSONData: state.geoJSONData
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    setLat: (response) => dispatch({type:'SET_LAT', val:response}),
    setLng: (response) => dispatch({type:'SET_LNG', val:response}),
    setEvents: (response) => dispatch({type:'SET_EVENTS', val:response}),
    setInterestedEvents: (response) => dispatch({type:'SET_INTERESTED_EVENTS', val:response}),
    setGeoJSONFeatures: (geoJSONFeatureArray) => dispatch({type:'SET_GEOJSON_DATA', val:geoJSONFeatureArray})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);