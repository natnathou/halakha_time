import React from "react";
import {connect} from "react-redux";
import moment from "moment-timezone";
import {citySelected, displayLoader} from "../actions";

class CityList extends React.Component {
    state={position:false, errorMessage: ""};

    /*
    @desc, we get the current location an update our local state with the result.
    */
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position =>{
            this.setState({position: position});
        }, err =>{
            this.setState({errorMessage: err});
        });
    }

    /*
    @desc, method to display our city list
    return, JSX
    */
    renderList (){
        //loop on cityListReducer to display our city list
        return this.props.cityListReducer.map( data => {
            return(
                <div className="item" key={data.city}>
                    <div className="right floated content">
                        <div
                            className="ui button primary"
                            onClick={ async ()=>{
                                // display the loader
                                this.props.displayLoader("block");
                                // condition to replace scroll to top on the top of TimeList Component if the client use a small screen
                                if(this.props.widthWindowsReducer <=768){
                                    window.scrollTo(0,this.props.positionTimeListReducer);
                                }
                                await this.props.citySelected(data.city, data.lat, data.lng, data.timezone);
                                //hide the loader
                                this.props.displayLoader("none");
                            }}>
                            Select</div>
                    </div>
                    <div className="ui header">
                      {data.city}
                    </div>
                </div>
            );
        });
    }
    render() {
        return(
            <div className="ui middle aligned divided list">
                <div className="item" key={"Your Location"}>
                    <div className="right floated content">
                        <div
                            className="ui button primary"
                            onClick={ async ()=>{
                                // display the loader
                                this.props.displayLoader("block");
                                // condition to replace scroll to top on the top of TimeList Component if the client use a small screen
                                if(this.props.widthWindowsReducer <= 768){
                                    window.scrollTo(0,this.props.positionTimeListReducer);
                                }
                                // if the client choose to search all the time about his location
                                if (this.state.position){
                                    await this.props.citySelected("Your Location", this.state.position.coords.latitude, this.state.position.coords.longitude, moment.tz.guess());
                                } else if (this.state.errorMessage.message === "User denied Geolocation"){
                                    //to alert the client to enable sharing location if we get an error
                                    alert("Please accept to share your location.");
                                }
                                // hide the loader
                                this.props.displayLoader("none");
                        }}>
                            Select
                        </div>
                    </div>
                    <div className="ui header">
                        <i className="location arrow icon"></i>
                    </div>
                </div>
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    let {cityListReducer,widthWindowsReducer,positionTimeListReducer} = state;
    return {cityListReducer,widthWindowsReducer,positionTimeListReducer}
};
export default connect(
    mapStateToProps, {citySelected, displayLoader}
)(CityList);

