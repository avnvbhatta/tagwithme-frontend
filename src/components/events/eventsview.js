import React, { useState, useEffect } from 'react';
import { getCurrentPosition } from "../../utils/utils";
import "./eventsview.scss";
import axios from "axios";
import Search from "../search/search"
import ListView from '../listview/listview';
import MapView from '../mapview/mapview';
import { Tabs } from 'antd';
import { UnorderedListOutlined, EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TabPane } = Tabs;

  
const EventsView = () => {  
    //Initial coordinates for displaying map
    const [coordinates, setCoordinates] = useState(null);

    //Set state based on events fetched from TicketMaster
    const [events, setEvents] = useState(null);

    //Set map coordinates based on search
    const [searchedCoordinates, setSearchedCoordinates] = useState(null);

    //Hook to get current user coordinates
    //Defaults to NYC coordinates if user denies permission to locate
    useEffect(() => {    
      getCurrentPosition()
      .then(res =>{
          const {coords} = res;
          const {longitude, latitude} = coords;
          return {longitude: longitude, latitude: latitude}
          
        })
      .then((c) =>
          {
            setCoordinates(c);
          }
      )
      .catch(e=>{
        console.log('error', e);
        setCoordinates({longitude: -73.935242, latitude: 40.730610}); //nyc geo location
      })
      
    }, []);


    //Get events from ticketmaster
    useEffect(() => {    
      if(coordinates){
        const getTicketMasterEvents = async () => {
          const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
              params: {
                apikey: process.env.TICKETMASTER_API_KEY,
                geoPoint: Math.round(coordinates.latitude)+","+Math.round(coordinates.longitude),
                size: 100
              }
            });
            const eventsRes = await response.data._embedded.events;
            let eventsArray = []
            eventsRes.map(event => {
              try {
                //Only store required details from ticketmaster response
                let eventInfo = {
                  id: event.id === undefined ? "" : event.id,
                  name: event.name === undefined ? "" : event.name,
                  classification: event.classification === undefined ? [] : {
                    segment: event.classifications[0].segment.name,
				            genre: event.classifications[0].genre.name
                  },
                  date: {
                    startTime: event.dates.start.localTime === undefined ? "" : moment(event.dates.start.localTime, 'HH:mm:ss').format("hA"),
                    startDate: event.dates.start.localDate === undefined ? "" : moment(event.dates.start.localDate ).format("ddd, MMM Do, YYYY"),
                  },
                  images: event.images === undefined ? [] : event.images,
                  url: event.url === undefined ? "" : event.url,
                  venue: event._embedded.venues[0].name === undefined ? "" : event._embedded.venues[0].name,
                  distance: event._embedded.venues[0].distance === undefined ? "" : `${event._embedded.venues[0].distance} miles away`,
                  address: event._embedded.venues[0].address.line1 === undefined ? "" : event._embedded.venues[0].address.line1,
                  city: event._embedded.venues[0].city === undefined ? "" : event._embedded.venues[0].city,
                  state: event._embedded.venues[0].state === undefined ? {} : event._embedded.venues[0].state,
                  location: event._embedded.venues[0].location === undefined ? {latitude: -70, longitude: 40} : event._embedded.venues[0].location,
                  parking: event._embedded.venues[0].parkingDetail === undefined ? "" : event._embedded.venues[0].parkingDetail,
                  priceRange: event.priceRanges === undefined ? "" :  `$${event.priceRanges[0].min} - $${event.priceRanges[0].max}`,
                  postalCode: event._embedded.venues[0].postalCode === undefined ? "" : event._embedded.venues[0].postalCode
                }
                eventsArray.push(eventInfo);
                
              } catch (error) {
                console.log('error', error)
              }
              
            })
            setEvents(eventsArray);            
        }
        getTicketMasterEvents();
      }
    }, [coordinates]);

    //Set coordinates based on search
    useEffect(() => {
      if(searchedCoordinates !== null){
        setCoordinates({longitude: searchedCoordinates.coordinates[0], latitude: searchedCoordinates.coordinates[1]})
      }
    }, [searchedCoordinates]);

    return (<div className="eventsContainer">
        <Search className="searchBar" searchedCoordinates={[searchedCoordinates, setSearchedCoordinates]}/>
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
            {events ? <MapView events={[events, setEvents]} coordinates={[coordinates, setCoordinates]}/> : <LoadingOutlined />}
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
            {events ? <ListView events={[events, setEvents]}/> : <LoadingOutlined />}
          </TabPane>
        </Tabs>
      </div>)  
  };
 
export default EventsView;