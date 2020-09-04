import * as actiontypes from "./actiontypes"

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
    jwt: null,
    flyToPlace: null
}

const reducer = (state = initialState, action) =>{
    const newState = {...state};

    if(action.type === actiontypes.USER_LOGIN){
        newState.jwt = action.val;
        
    }
    if(action.type === actiontypes.CHECK_USER_LOGGED_IN){
        newState.isLoggedIn = action.val.isAuthenticated;
        newState.userData = action.val.userData;
        newState.isAuthenticating = false;

        let followingSet = new Set();
        action.val.userData.following.map(following => {
            followingSet.add(parseInt(following.id));
        })

        newState.userData.followingSet = followingSet;

        newState.userData.followers = action.val.userData.followers;
        newState.userData.following = action.val.userData.following;
        
    }

    if(action.type === actiontypes.SET_NEW_PLACE){
        newState.isNewLocation = action.val
    }

    if(action.type === actiontypes.USER_LOG_OUT){
        newState.isLoggedIn = false;
        newState.userData = {};
        localStorage.removeItem('jwt');
    }

    if(action.type === actiontypes.SET_LAT){
        newState.lat = action.val;
    }

    if(action.type === actiontypes.SET_LNG){
        newState.lng = action.val;
    }

    if(action.type === actiontypes.SET_EVENTS){
        newState.events = action.val;
    }

    if(action.type === actiontypes.SET_GEOJSON_DATA){
        newState.geoJSONData.features = action.val;
    }

    if(action.type === actiontypes.SET_INTERESTED_EVENTS){
        newState.interestedEvents = action.val;
    }

    if(action.type === actiontypes.UPDATE_EVENT_INTERESTED){
        //Update the state object and change the isInterested property of clicked event
        const elementsIndex = newState.events.findIndex(element => element.id == action.val );
        newState.events[elementsIndex] = {...newState.events[elementsIndex], isInterested: !newState.events[elementsIndex].isInterested}
    }

    if(action.type === actiontypes.UPLOAD_IMAGE){ 
        newState.userData.imgurl = action.val;
    }

    if(action.type === actiontypes.UNFOLLOW){
        newState.userData.followingSet.delete(parseInt(action.val));
        newState.userData.following = newState.userData.following.filter(following => parseInt(following.id) !== parseInt(action.val))
    }

    if(action.type === actiontypes.FOLLOW){
        if(!newState.userData.followingSet.has(parseInt(action.val.id))){
            newState.userData.followingSet.add(parseInt(action.val.id));
            newState.userData.following = [...newState.userData.following, parseInt(action.val)]
        }
       
    }

    if(action.type === actiontypes.FLY_TO_PLACE){
        newState.flyToPlace = action.val;
    }

    if(action.type === actiontypes.UPDATE_USER_PROFILE){
        newState.userData.state = action.val.state;
        newState.userData.city = action.val.city;
        newState.userData.name = action.val.name;
    }

    return newState;

};

export default reducer;