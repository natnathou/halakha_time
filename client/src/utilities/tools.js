/*
@desc function, check if we have to add 0 before the number
@params - (number)
@return - number
*/
export const addZero = i => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

/*
@desc function, convert milliseconds in hours
@params - (number)
@return - string
*/
export const convertMS       = milliseconds => {
    let hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute  = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour    = Math.floor(minute / 60);
    minute  = minute % 60;
    hour    = hour % 24;
    return `${addZero(hour)}:${addZero(minute)}:${addZero(seconds)}`
};

/*
@desc function, convert time zone of the client to the time zone of the city that the client search
@params - (Date, string)
@return - string
*/
export const convertTimeZone = (dates, timeZone) => {
    let newDate = dates.toLocaleString('en-US', {timeZone: timeZone, hour12: false});
    let hours   = newDate.split(' ');
    return (hours[1]);
};


/*
@desc function, push all the relative time to single array
@params - (array, string, string, string)
@return - nothing
*/
export const pushAllinfo = (timeArray, name, time, zone) => {
    timeArray.push({name: name, time: convertTimeZone(time, zone)});
};

/*
@desc function, calculate all the necessary time
@params - (object)
@return - object
*/
export const calculateTime = (action) => {
    let zoneTime       = action.payload.response.timezone;
    let arrayTime      = [];
    let cityName       = action.payload.response.cityName;
    let sunrise        = new Date(action.payload.response.response.data.results.sunrise);
    let sunset         = new Date(action.payload.response.response.data.results.sunset);
    let minuteSunTime  = (sunset - sunrise) / (12 * 60);
    let dawn           = new Date(sunrise.getTime() - 72 * minuteSunTime);
    let RabenouTam     = new Date(sunset.getTime() + 72 * minuteSunTime);
    let hourssun       = (sunset - sunrise) / 12;
    let hoursDawnTime  = (RabenouTam - dawn) / 12;
    let tfilineTime    = new Date(sunrise.getTime() - hourssun);
    let shemaTimeMga   = new Date(dawn.getTime() + hoursDawnTime * 3);
    let shemaTimeGra   = new Date(sunrise.getTime() + hourssun * 3);
    let tfilaTime      = new Date(sunrise.getTime() + hourssun * 4);
    let hatsotAyom     = new Date(sunrise.getTime() + hourssun * 6);
    let minhaGedola    = new Date(hatsotAyom.getTime() + 30 * minuteSunTime);
    let minhaKetana    = new Date(sunrise.getTime() + 9.5 * hourssun);
    let plagMinhaGra   = new Date(hatsotAyom.getTime() + hourssun * 285 / 60);
    let nightTime      = new Date(sunset.getTime() + 13.5 * minuteSunTime);
    let hatsotlaila    = new Date(nightTime.getTime() + 6 * 3600 * 1000);
    let sunsetFriday   = new Date(action.payload.response.responseFriday.data.results.sunset);
    let shabat_begin   = new Date(sunsetFriday.getTime() - 20 * 60 * 1000);
    let sunsetSaturday = new Date(action.payload.response.responseSaturday.data.results.sunset);
    let shabat_finish  = new Date(sunsetSaturday.getTime() + 30 * 60 * 1000);
    pushAllinfo(arrayTime, "עלות השחר", dawn, zoneTime);
    pushAllinfo(arrayTime, "תפילין", tfilineTime, zoneTime);
    pushAllinfo(arrayTime, "נץ החמה", sunrise, zoneTime);
    pushAllinfo(arrayTime, "ק\"ש מגן אברהם", shemaTimeMga, zoneTime);
    pushAllinfo(arrayTime, "ק\"ש גרא", shemaTimeGra, zoneTime);
    pushAllinfo(arrayTime, "תפילה", tfilaTime, zoneTime);
    pushAllinfo(arrayTime, "חצות היום", hatsotAyom, zoneTime);
    pushAllinfo(arrayTime, "מנחה גדולה", minhaGedola, zoneTime);
    pushAllinfo(arrayTime, "מנחה קטנה", minhaKetana, zoneTime);
    pushAllinfo(arrayTime, "פלג", plagMinhaGra, zoneTime);
    pushAllinfo(arrayTime, "שקיעה החמה", sunset, zoneTime);
    pushAllinfo(arrayTime, "(צאת הכוכבים (גהונים", nightTime, zoneTime);
    pushAllinfo(arrayTime, "ר\"ת", RabenouTam, zoneTime);
    pushAllinfo(arrayTime, "חצות לילה", hatsotlaila, zoneTime);
    pushAllinfo(arrayTime, "כניסת שבת", shabat_begin, zoneTime);
    pushAllinfo(arrayTime, "צאת השבת", shabat_finish, zoneTime);
    arrayTime.push({name: "שעת זמנית", time: convertMS(hourssun)});
    return {cityName, arrayTime};
};