import {combineReducers} from "redux";
import {calculateTime} from "../utilities/tools"


/*
@desc reducer, to store our city list and their details. (latitude, longitude, and timezone)
@params - list of city with details (array)
@return - list of city with details (array)
*/
const cityListReducer = (
    states = [
        {city: "Jerusalem", lat: 31.778345, lng: 35.2250786, timezone: "Asia/Jerusalem"},
        {city: "Tel Aviv", lat: 32.0804808, lng: 34.7805274, timezone: "Asia/Jerusalem"},
        {city: "Natanya", lat: 32.321457, lng: 34.853195, timezone: "Asia/Jerusalem"},
        {city: "Haifa", lat: 32.8191218, lng: 34.9983856, timezone: "Asia/Jerusalem"},
        {city: "Eilat", lat: 29.5569348, lng: 34.9497949, timezone: "Asia/Jerusalem"},
        {city: "Paris", lat: 48.8566969, lng: 2.3514616, timezone: "Europe/Paris"},

    ]) => {
    return states;
};

/*
@desc reducer, to store relative details of a city (latitude, longitude ...) when we search it.
@params - name of city (string)
@return - action.payload or an empty string if any action is choose
*/
const searchCityReducer = (
    cityName = "",
    action) => {
    if (action.type === "SEARCH_CITY") {
        return action.payload;
    }
    return cityName;
};

/*
@desc reducer, to store relative time of a city (sunrise, sunset ...).
@params - data of city, name of the city, latitude, longitude (object)
@return - function or an empty object if any action is choose
*/
const relativeTimeReducer = (
    data = {},
    action) => {

    if (action.type === "CITY_SELECTED") {
        return calculateTime(action);                                 //function calculateTime is use to make all the necessary calc about the day time
    }
    return data;
};

/*
@desc reducer, used to store a boolean in our global state, true to display the list of the result when to make a search, and false to hide the list.
@params - (boolean)
@return - action or a boolean if any action.payload is choose
*/
const displaySearchListReducer = (
    display = false,
    action) => {
    if (action.type === "DISPLAY_SEARCH_LIST") {
        return action.payload;
    }
    return display;
};

/*
@desc reducer, used to store a the value of our input.
@params - (string)
@return - action or an empty string if any action.payload is choose
*/
const valueSearchBarReducer = (
    value = "",
    action) => {
    if (action.type === "UPDATE_VALUE_SEARCH_BAR") {
        return action.payload;
    }
    return value;
};

/*
@desc reducer, used to store a boolean in our global state, true to display the loader when we select a city.
@params - (boolean)
@return - action or a boolean if any action.payload is choose
*/
const displayLoaderReducer = (display = "none", action) => {
    if (action.type === "DISPLAY_LOADER") {
        return action.payload;
    }
    return display;
};
/*
@desc reducer, used to store window width in our global state.
@params - (number)
@return - action or a number if any action.payload is choose
*/
const widthWindowsReducer = (width = window.innerWidth, action) => {
    if (action.type === "WIDTH_UPDATE") {
        return action.payload;
    }
    return width;
};

/*
@desc reducer, used to store y position of TimeList component in our global state.
    @params - (number)
@return - action or a number if any action.payload is choose
*/
const positionTimeListReducer = (position = 0, action) => {
    if (action.type === "POSITION_TIME_LIST_UPDATE") {
        return action.payload;
    }
    return position;
};

/*
@desc combine reducer to make them our global state.
*/
export default combineReducers({
    cityListReducer,
    searchCityReducer,
    relativeTimeReducer,
    displaySearchListReducer,
    valueSearchBarReducer,
    displayLoaderReducer,
    widthWindowsReducer,
    positionTimeListReducer
});


