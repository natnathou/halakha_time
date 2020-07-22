/*
@desc React & Redux application to calculate the relative time for the jewish prayer of "today",
       Api Call to get coordinated of the city tat we search,
       another Api Call to get sunrise time & sunset time of this city,
       and we calculate the good time for the jewish calendar
 @author: Netanel Zaffran
 @email: ne.zaffran@gmail.com
 @github link: https://github.com/natnathou/time
 @heroku link: https://halakhatime.herokuapp.com/
*/

import React from "react";
import {connect} from "react-redux";
import CityList from "./CityList";
import NewCity from "./NewCity"
import ListCityOnSearch from "./ListCityOnSearch";
import TimeList from "./TimeList";
import {widthUpdate} from "../actions";


class App extends React.Component {
    componentDidMount() {
        // to detect any change in windows resize and store again the new width of window, to compare later id the client use a small screen or a big screen
        window.addEventListener('resize', ()=>{
            this.props.widthUpdate(window.innerWidth);
        });
    }

    render() {
        return (
            <div className="App">
                <div style={{display: "flex", justifyContent: "center", paddingTop: "50px", marginBottom: "50px"}}>
                    <h2 className="ui icon header">
                        <i className="settings icon"></i>
                        <div className="content">
                            זמנים
                        </div>
                    </h2>
                </div>
                

                <div className="ui container stackable two column grid">
                <div className="ui container segment center aligned">
                        .כל השעות מחושבות לפי שיטת רב עובדיה יוסף זצ"ל, חוץ מחצות לילה לפי שיטת רבינו נחמן מברסלב
                        <br/>
                        (זמני השבת מתעדכנים כל ימי ראשון ותקפים לאורך כל השבוע) 
                 </div>
                    <div className="column">
                        <CityList/>
                        <NewCity/>
                        <div role="list" className="ui selection middle aligned list">
                            <ListCityOnSearch/>
                        </div>
                    </div>
                    <div className="column">
                        <TimeList/>
                    </div>
                    
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return state
};
export default connect(
    mapStateToProps, {widthUpdate}
)(App);


