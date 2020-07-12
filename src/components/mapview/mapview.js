import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapview.scss";
import { connect } from "react-redux";

const MapView = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (props.events) {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [props.lng, props.lat],
          zoom: 10
        });

        map.on("load", () => {
          setMap(map);
          map.resize();      
       
        });

        map.addControl(new mapboxgl.NavigationControl());

        const geoLocate = new mapboxgl.GeolocateControl();
        map.addControl(geoLocate);
        geoLocate.on('geolocate', function (e) {
          map.flyTo({
            center: [e.coords.longitude, e.coords.latitude],
            zoom: 10 //set zoom 
          });
          props.setLat(e.coords.latitude);
          props.setLng(e.coords.longitude);
        });

        map.on('dragend', function (e) {
          const { lat, lng } = map.getCenter();
          props.setLat(lat);
          props.setLng(lng);
        });

        map.on('zoomend', function (e) {
          const { lat, lng } = map.getCenter();
          console.log(lat, lng)
          console.log(map.getZoom())
        });


        props.events.map(event=>{
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

        props.isNewPlace(false)
      };
      initializeMap({ setMap, mapContainer });
    }
    
  }, [props.isNewLocation]);


  return (<div>
    <div ref={el => (mapContainer.current = el)} className="mapContainer" />
  </div>)
};

const mapStateToProps = (state) => {
  return {
    lat: state.lat,
    lng: state.lng,
    events: state.events,
    isNewLocation: state.isNewLocation,
    geoJSONData: state.geoJSONData
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setLat: (response) => dispatch({ type: 'SET_LAT', val: response }),
    setLng: (response) => dispatch({ type: 'SET_LNG', val: response }),
    isNewPlace: (isNewBool) => dispatch({type:'SET_NEW_PLACE', val:isNewBool})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapView);