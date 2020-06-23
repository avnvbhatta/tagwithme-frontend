import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapview.scss";
import { getCurrentPosition } from "../../utils/utils";

  
const MapView = () => {  
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [coordinates, setCoordinates] = useState({
        longitude: -80.9981576, latitude: 35.045021999999996
    });

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
      mapboxgl.accessToken = "pk.eyJ1IjoiYXZudmJoYXR0YSIsImEiOiJja2JyOXRjancxNGthMndsbTE4dDNrdDB0In0.-CLS7_4DVmpgROSDPOoltA";

      const initializeMap = ({ setMap, mapContainer }) => {
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
    });
    
    return <div ref={el => (mapContainer.current = el)} className="mapContainer" />;
  };
 
export default MapView;