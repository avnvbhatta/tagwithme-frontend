import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, AutoComplete } from 'antd';
import "./search.scss"
import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';


const Search = (props) => {
  const [options, setOptions] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [cityListLoaded, setCityListLoaded] = useState(false);
  const [searchedCoordinates, setsearchedCoordinates] = props.searchedCoordinates;
    const [test, setTest] = props.test;
  
  const onSearch = async searchText => {
    if(searchText){
        setTest(searchText)
        const locationAutoCompleteURL = 
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`;

        const response = await axios.get(locationAutoCompleteURL, {
            params: {
            access_token: "pk.eyJ1IjoiYXZudmJoYXR0YSIsImEiOiJja2JyOXRjancxNGthMndsbTE4dDNrdDB0In0.-CLS7_4DVmpgROSDPOoltA",
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

    const onSelect = (city, coordinates) => {
        setsearchedCoordinates(coordinates);
    };


  return (
    <>
      <AutoComplete
        options={options}
        className="searchBox" 
        onSelect={(city, coordinates) => onSelect(city, coordinates)}
        onSearch={onSearch}
      >
           <Input prefix={<SearchOutlined />} placeholder="Enter an address, neighborhood, city or ZIP code" />
      </AutoComplete>
      
    </>
  );
};

export default Search;