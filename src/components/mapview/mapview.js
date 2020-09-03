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
  const popUpRef = useRef(new mapboxgl.Popup({offset: 15, anchor: 'top'}));

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
            'data': props.geoJSONData,
            cluster: true,
            clusterMaxZoom: 12, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
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
              'icon-size': 3,
              "icon-offset": [0, -7],
              // 'icon-image': '{id}',
              // 'icon-size': 0.25,
              // "icon-anchor": 'bottom',
              
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top',
              "text-size": 15
          },
          
    });

         map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'points',
          filter: ['has', 'point_count'],
          paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              25,
              '#f1f075',
              50,
              '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              40,
              200,
              60
            ]
          }
          });

          
          map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'points',
            filter: ['has', 'point_count'],
            layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
            }
            });

          

       
        

          // inspect a cluster on click
          map.on('click', 'clusters', function(e) {
            var features = map.queryRenderedFeatures(e.point, {
              layers: ['clusters']
            });
            var clusterId = features[0].properties.cluster_id;
            map.getSource('points').getClusterExpansionZoom(
              clusterId,
              function(err, zoom) {
              if (err) return;
              
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
              }
            );
          });


            // When a click event occurs on a feature in
            // the unclustered-point layer, open a popup at
            // the location of the feature, with
            // description HTML from its properties.
            map.on('click', 'unclustered-point', function(e) {
              var coordinates = e.features[0].geometry.coordinates.slice();
              var mag = e.features[0].properties.mag;
              
              // Ensure that if the map is zoomed out such that
              // multiple copies of the feature are visible, the
              // popup appears over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
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


        // change cursor to pointer when user hovers over a clickable feature
        map.on("mouseenter", "clusters", e => {
          if (e.features.length) {
            map.getCanvas().style.cursor = "pointer";
          }
        });

        // reset cursor to default when user is no longer hovering over a clickable feature
        map.on("mouseleave", "clusters", () => {
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
            map.flyTo({
              center: feature.geometry.coordinates,
              essential: true,
              offset: [0,-250],
              speed: 0.5
            })
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


  useEffect(()=>{
    if(props.flyToPlace){
        map.flyTo({
          center: props.flyToPlace,
          zoom: 13 //set zoom 
        });
    }
   
  }, [props.flyToPlace])

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
    geoJSONData: state.geoJSONData,
    flyToPlace: state.flyToPlace
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