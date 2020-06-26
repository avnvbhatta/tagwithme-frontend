import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapview.scss";
  
const MapView = (props) => {  
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [coordinates, setCoordinates] = props.coordinates;
    const [events, setEvents] = props.events;


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
    }, [events, coordinates]);

    

    return (<div>
        <div ref={el => (mapContainer.current = el)} className="mapContainer" />
      </div>)  
  };
 
export default MapView;