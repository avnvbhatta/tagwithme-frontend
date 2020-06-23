import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapview.scss";
import { getCurrentPosition } from "../../utils/utils";
import axios from "axios";
  
const MapView = () => {  
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [coordinates, setCoordinates] = useState(null);
    const [events, setEvents] = useState(null);

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
      
    }, []);


    useEffect(() => {    
      if(coordinates){

        const getTicketMasterEvents = async () => {
          const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
              params: {
                apikey: "LMX62etGfMGogQNGUjnr9Dh2yvtQ88sI",
                geoPoint: Math.round(coordinates.latitude)+","+Math.round(coordinates.longitude),
                size: 200
              }
            });
            const events = response.data._embedded.events;

            let eventsArray = []
            events.map(event => {
              try {
                let eventInfo = {
                  name: event.name,
                  date: {
                    startTime: event.dates.start.localTime,
                    startDate: event.dates.start.localDate
                  },
                  images: event.images,
                  url: event.url,
                  venue: event._embedded.venues[0].name,
                  city: event._embedded.venues[0].city,
                  state: event._embedded.venues[0].state,
                  location: event._embedded.venues[0].location,
                  parking: event._embedded.venues[0].parkingDetail,
                  priceRange: event.priceRanges
                }
                eventsArray.push(eventInfo);
              } catch (error) {
                console.log('error', error)
              }
              
            })
            setEvents(eventsArray)
            console.log(eventsArray)
            
        }

        getTicketMasterEvents();
      }
    }, [coordinates]);


    useEffect(() => {    
      if(events){
        mapboxgl.accessToken = "pk.eyJ1IjoiYXZudmJoYXR0YSIsImEiOiJja2JyOXRjancxNGthMndsbTE4dDNrdDB0In0.-CLS7_4DVmpgROSDPOoltA";

        const initializeMap = ({ setMap, mapContainer }) => {
        console.log('initialize map')
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [coordinates.longitude, coordinates.latitude],
          zoom: 5
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
                .setHTML('<h3>'+event.name+'</h3><p>This is where I am</p>'))
                .addTo(map);

        })
      };
      if (!map) initializeMap({ setMap, mapContainer });
      }
    }, [events]);
    return <div ref={el => (mapContainer.current = el)} className="mapContainer" />;
  };
 
export default MapView;