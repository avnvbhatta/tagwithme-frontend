import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapview.scss";
import { getCurrentPosition } from "../../utils/utils";
import axios from "axios";
  
const MapView = () => {  
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [coordinates, setCoordinates] = useState({
        longitude: -80.9981576, latitude: 35.045021999999996
    });
    const [events, setEvents] = useState(null);

    useEffect(() => {    
        const fetchCoordinates = async () => {
            console.log('fetch coordinates')
            try {
                const { coords } = await getCurrentPosition();
                const { latitude, longitude } = coords;                
                setCoordinates({longitude: longitude, latitude: latitude})
            } catch (error) {
                console.error(error);
            }
        };

        const getTicketMasterEvents = async () => {
          console.log('ticketmaster')
          const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
              params: {
                apikey: "LMX62etGfMGogQNGUjnr9Dh2yvtQ88sI",
                geoPoint: Math.round(coordinates.latitude)+","+Math.round(coordinates.longitude)
              }
            });
            //const data = await response.json();
            const events = response.data._embedded.events;
            console.log(events);

            let eventsArray = []
            events.map(event => {
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
            })
            setEvents(eventsArray)
            console.log(events)
            
        }

        getTicketMasterEvents();

      mapboxgl.accessToken = "pk.eyJ1IjoiYXZudmJoYXR0YSIsImEiOiJja2JyOXRjancxNGthMndsbTE4dDNrdDB0In0.-CLS7_4DVmpgROSDPOoltA";

      const initializeMap = ({ setMap, mapContainer }) => {
        console.log('initialize map')
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [coordinates.longitude, coordinates.latitude],
          zoom: 15
        });
  
        map.on("load", () => {
          setMap(map);
          map.resize();
        });

        //For creating popups
        // create a HTML element for each popup
        console.log(events, 'from inside map')
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat([coordinates.longitude, coordinates.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>Home</h3><p>This is where I am</p>'))
            .addTo(map);


      };
  
      if (!map) initializeMap({ setMap, mapContainer });
    }, []);
    
    return <div ref={el => (mapContainer.current = el)} className="mapContainer" />;
  };
 
export default MapView;