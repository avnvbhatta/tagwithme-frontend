import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapview.scss";
import { getCurrentPosition } from "../../utils/utils";
import axios from "axios";
import Search from "../search/search"
  
const MapView = () => {  
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [coordinates, setCoordinates] = useState(null);
    const [events, setEvents] = useState(null);
    const [test, setTest] = useState('');
    const [searchedCoordinates, setSearchedCoordinates] = useState(null);

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


    useEffect(() => {    
      if(coordinates){

        const getTicketMasterEvents = async () => {
          const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
              params: {
                apikey: "LMX62etGfMGogQNGUjnr9Dh2yvtQ88sI",
                geoPoint: Math.round(coordinates.latitude)+","+Math.round(coordinates.longitude),
                size: 100
              }
            });
            const events = response.data._embedded.events;
            let eventsArray = []
            events.map(event => {
              try {
                let eventInfo = {
                  name: event.name === undefined ? "" : event.name,
                  date: {
                    startTime: event.dates.start.localTime === undefined ? "" : event.dates.start.localTime,
                    startDate: event.dates.start.localDate === undefined ? "" : event.dates.start.localDate 
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
            setEvents(eventsArray)
            
        }

        getTicketMasterEvents();
      }
    }, [coordinates]);


    useEffect(() => {    
      if(events){
        mapboxgl.accessToken = "pk.eyJ1IjoiYXZudmJoYXR0YSIsImEiOiJja2JyOXRjancxNGthMndsbTE4dDNrdDB0In0.-CLS7_4DVmpgROSDPOoltA";

        const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [coordinates.longitude, coordinates.latitude],
          zoom: 10
        });
  
        map.on("load", () => {
          setMap(map);
          map.resize();
        });

        events.map(event=>{
        //For creating popups
            // create a HTML element for each popup
            var el = document.createElement('div');
            el.className = 'marker';
            

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat([event.location.longitude, event.location.latitude])
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                `<div class="popup">
                  <div class="content">
                    <div class="left">
                      <div class="title">${event.name}</div>
                      <div class="venue">${event.venue}</div>
                        <div class="address">${event.address},
                          <br>${event.city.name}, ${event.state.stateCode}, ${event.postalCode}</div>
                      <div class="distancePrice"><div>${event.distance}</div><div>${event.priceRange}</div></div>
                    </div>
                    <div class="right">
                      <div class="datetime">${event.date.startDate}<br> ${event.date.startTime}</div>
                    </div>
                  </div>
                  <div class="interested"><div>Interested</div></div>
                
                </div>`))
                .addTo(map);

        })

    
      };
      initializeMap({ setMap, mapContainer });
      }
    }, [events, searchedCoordinates]);

    useEffect(() => {
      
      if(searchedCoordinates !== null){
        setCoordinates({longitude: searchedCoordinates.coordinates[0], latitude: searchedCoordinates.coordinates[1]})
      }
     
    }, [searchedCoordinates]);

    return (<div>
        <div ref={el => (mapContainer.current = el)} className="mapContainer" />
        <Search searchedCoordinates={[searchedCoordinates, setSearchedCoordinates]} test={[test, setTest]}/>
      </div>)  
  };
 
export default MapView;