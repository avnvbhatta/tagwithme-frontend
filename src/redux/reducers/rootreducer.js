const initialState = {
    isAuthenticating: true,
    isLoggedIn: false, //flag to see if user is logged in
    userData: {}, //user data that contains id, name and email
    lat: 40.730610, //default NYC latitude
    lng: -73.935242, //default NYC longitude,
    events: [], //master events array generated from ticketmaster,
    geoJSONData : {
        type: "FeatureCollection",
        features: []
    },
    interestedEvents: new Set(),
    isNewLocation: false,
}

const reducer = (state = initialState, action) =>{
    const newState = {...state};

    if(action.type === 'CHECK_USER_LOGGED_IN' || action.type === 'USER_LOGIN'){
        newState.isLoggedIn = action.val.isAuthenticated;
        newState.userData = action.val.userData;
        newState.isAuthenticating = false;
    }

    if(action.type === 'SET_NEW_PLACE'){
        newState.isNewLocation = action.val
    }

    if(action.type === 'USER_LOG_OUT'){
        newState.isLoggedIn = false;
        newState.userData = {};
        localStorage.removeItem('jwt');
    }

    if(action.type === 'SET_LAT'){
        newState.lat = action.val;
    }

    if(action.type === 'SET_LNG'){
        newState.lng = action.val;
    }

    if(action.type === 'SET_EVENTS'){
        newState.events = action.val;
    }

    if(action.type === 'SET_GEOJSON_DATA'){
        newState.geoJSONData.features = action.val;
    }

    if(action.type === 'SET_INTERESTED_EVENTS'){
        newState.interestedEvents = action.val;
    }

    if(action.type === 'UPDATE_EVENT_INTERESTED'){
        //Update the state object and change the isInterested property of clicked event
        const elementsIndex = newState.events.findIndex(element => element.id == action.val );
        newState.events[elementsIndex] = {...newState.events[elementsIndex], isInterested: !newState.events[elementsIndex].isInterested}
    }

    if(action.type === 'UPLOAD_IMAGE'){
        newState.userData.imgurl = action.val;
    }
   
    return newState;

};

export default reducer;