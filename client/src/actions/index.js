import SearchCityApi from "../components/api/searchCityName"
import SearchSunsetApi from "../components/api/ApiSunset"
import moment from "moment-timezone";

const KEY = process.env.REACT_APP_KEY_API;


/*
@desc this action, is executed when the client selected a city, to get the sunrise time and the sunset of this city, with an API CALL
@params - name of the city (string), latitude (number), longitude (number)
@return - an object with the type of this action, and the response of the API CALL
*/
export const citySelected = (
    cityName = "Jerusalem",
    lat      = 31.778345,
    lng      = 35.2250786,
    timezone = "Asia/Jerusalem") => async displach => {
    let error            = "";
    let response         = {};
    let responseFriday   = {};
    let responseSaturday = {};
    let nextFriday       = "";
    let nextSaturday     = moment(moment().day(6)._d).format("YYYY-MM-DD");
    //  we test if saturday is over
    if (moment().format("dddd") === "Saturday") {
        nextFriday = moment(moment().day(-2)._d).format("YYYY-MM-DD");
    } else {
        nextFriday = moment(moment().day(5)._d).format("YYYY-MM-DD");
    }
    console.log(moment().format("dddd"));
    try {
        response         = await SearchSunsetApi.get(`json?lat=${lat}&lng=${lng}&date=today&formatted=0`);
        responseFriday   = await SearchSunsetApi.get(`json?lat=${lat}&lng=${lng}&date=${nextFriday}&formatted=0`);
        responseSaturday = await SearchSunsetApi.get(`json?lat=${lat}&lng=${lng}&date=${nextSaturday}&formatted=0`);
    } catch (e) {
        error = e;
    }
    displach({
        type   : 'CITY_SELECTED',
        payload: {
            response: {cityName, response, responseFriday, responseSaturday, timezone},
            error   : error
        }
    });
};

/*
@desc this action, is executed when the client search a city, to get the latitude and the longitude of this city, with an API CALL
@params - name of the city (string)
@return - an object with the type of this action, and the response of the API CALL
*/
export const searchCity = dataInput => async displach => {
    let response = [], error = "";
    try {
        response = await SearchCityApi.get(`json?q=${dataInput}&key=${KEY}`);
    } catch (e) {
        error = e;
    }
    displach({
        type   : 'SEARCH_CITY',
        payload: {
            response: response,
            error   : error
        }
    });
};

/*
@desc this action, is executed when the client click on the search list, to hide the list when a city is selected, and to display the list when the client make a new search
@params - (boolean)
@return - an object with the type (string) of this action, and the the payload (boolean)
*/
export const displaySearchList = booleans => {
    return {type: "DISPLAY_SEARCH_LIST", payload: booleans}
};

/*
@desc this action, is executed when the client search a city, to make the component as a controlled component. so when want to transfer the value of the input to a global state in our reducer
@params - (string)
@return - an object with the type (string) of this action, and the the payload (string)
*/
export const updateValueSearchBar = (value) => {
    return {type: "UPDATE_VALUE_SEARCH_BAR", payload: value}
};

/*
@desc this action, is executed when the client select a city, to display or to hide the loader in the component TimeList
@params - (string)
@return - an object with the type (string) of this action, and the the payload (string)
*/
export const displayLoader = (display = "none") => {
    return {type: "DISPLAY_LOADER", payload: display}
};

/*
@desc this action, is executed to update the window width in our global state
@params - (number)
@return - an object with the type (string) of this action, and the the payload (number)
*/
export const widthUpdate = (width = window.innerWidth) => {
    return {type: "WIDTH_UPDATE", payload: width}
};

/*
@desc this action, is executed to update y position of TimeList Component in our global state
@params - (number)
@return - an object with the type (string) of this action, and the the payload (number)
*/
export const positionTimeListUpdate = (position) => {
    return {type: "POSITION_TIME_LIST_UPDATE", payload: position}
};


