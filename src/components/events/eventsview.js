import React, { useState, useEffect } from 'react';
import "./eventsview.scss";
import axios from "axios";
import Search from "../search/search"
import ListView from '../listview/listview';
import MapView from '../mapview/mapview';
import { Tabs } from 'antd';
import { UnorderedListOutlined, EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { connect } from "react-redux";
import { filterTicketMasterEvents } from "../../utils/utils"

const { TabPane } = Tabs;


const EventsView = (props) => {
  
  //hook to get user interested event to highlight already interested events
  useEffect(() => { 
    if(props.isLoggedIn){
      const getInterestedEvents = async () =>{
        let res = await axios.get(`${process.env.REACT_APP_API_GET_INTERESTED_EVENTS_ENDPOINT}${props.userData.id}`);
        const interestedEvents = await res.data;
          let interestedSet = new Set();
          interestedEvents.map(event => {
            interestedSet.add(event.eventid);
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
              radius: 100,
              size: 3
            }
          });
          const eventsRes = await response.data._embedded.events;
          const { eventsArray, geoJSONFeatureArray } = filterTicketMasterEvents(eventsRes, props.interestedEvents);
          // console.log();
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



  return (<div className="eventsContainer">
    <Search className="searchBar" />
    <Tabs defaultActiveKey="1" >
      <TabPane
        tab={
          <span>
            <EnvironmentOutlined />
                View On A Map
              </span>
        }
        key="1"
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
        key="2"
      >
        <ListView />
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