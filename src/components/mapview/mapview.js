import ReactDOM from "react-dom";
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "./mapview.scss";
import { connect } from "react-redux";
import Popup from "../popup/popup";
import { Provider } from "react-redux";
import store from "../../redux/index";


const MapView = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

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

          map.addSource('points', {
            'type': 'geojson',
            'data': props.geoJSONData
         });
          map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'points',
              'layout': {
                  // get the icon name from the source's "icon" property
                  // concatenate the name to get an icon from the style's sprite sheet
                  'icon-image': ['concat', ['get', 'icon'], '-15'],
                  // get the title name from the source's "title" property
                  'text-field': ['get', 'title'],
                  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                  'text-offset': [0, 0.6],
                  'text-anchor': 'top'
              }
        });
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
        });
    
        // change cursor to pointer when user hovers over a clickable feature
        map.on("mouseenter", "points", e => {
          if (e.features.length) {
            map.getCanvas().style.cursor = "pointer";
          }
        });

        // reset cursor to default when user is no longer hovering over a clickable feature
        map.on("mouseleave", "points", () => {
          map.getCanvas().style.cursor = "";
        });

        // add popup when user clicks a point
        map.on("click", "points", e => {
          if (e.features.length) {
            const feature = e.features[0];
            // create popup node
            const popupNode = document.createElement("div");
            ReactDOM.render(<Provider store={store}><Popup feature={feature} popUpRef={popUpRef} props={props.events}/></Provider>, popupNode);
            // set popup on map
            popUpRef.current
              .setLngLat(feature.geometry.coordinates)
              .setDOMContent(popupNode)
              .addTo(map);
          }
        });


        props.isNewPlace(false)
      };
      initializeMap({ setMap, mapContainer });
    }
    
  }, [props.isNewLocation]);

  useEffect(()=>{
    if(map){
      map.getSource('points').setData(props.geoJSONData);
    }
  }, [map, props.lat])



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