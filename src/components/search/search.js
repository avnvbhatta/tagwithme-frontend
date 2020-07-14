import React, { useState, useRef} from 'react';
import 'antd/dist/antd.css';
import { Input, AutoComplete } from 'antd';
import "./search.scss"
import axios from "axios";
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {connect} from "react-redux";


const Search = (props) => {
  const [options, setOptions] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [cityListLoaded, setCityListLoaded] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  
  const onSearch = async searchText => {
    if(searchText){
        const locationAutoCompleteURL = 
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`;

        const response = await axios.get(locationAutoCompleteURL, {
            params: {
            access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            limit: 5,
            country: "US" //can change country here later
            }
        });
       
        let jsonCityList = await (response.data.features);
        let cityList = []
        jsonCityList.map(city => {
            cityList.push({value: city.place_name, coordinates: city.center})
        })
        setCityList(cityList);
        setCityListLoaded(true);
        setOptions(
            !searchText || searchText.length === 1 ? [] : cityListLoaded ? cityList : [],
        );
    }       
    };

    const onSelect = (city, results) => {
        props.isNewPlace(true);
        props.setLat(results.coordinates[1]);
        props.setLng(results.coordinates[0]);
    };


  return (
    <>
      <AutoComplete
        options={options}
        className="searchBox" 
        onSelect={(city, coordinates) => onSelect(city, coordinates)}
        onSearch={onSearch}
        allowClear
      >
           <Input prefix={<SearchOutlined />}  allowClear
            placeholder="Enter an address, neighborhood, city or ZIP code" />
      </AutoComplete>
      
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLat: (res) => dispatch({type: 'SET_LAT', val:res}),
    setLng: (res) => dispatch({type: 'SET_LNG', val:res}),
    isNewPlace: (isNewBool) => dispatch({type:'SET_NEW_PLACE', val:isNewBool})
  }
}

export default connect(null, mapDispatchToProps)(Search);