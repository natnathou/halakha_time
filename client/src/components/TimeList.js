import React from "react";
import {connect} from "react-redux";
import {citySelected, displayLoader,positionTimeListUpdate} from "../actions";
import TimeDetails from "./TimeDetails";
import Loader from "./Loader";

class TimeList extends React.Component {
    constructor(props) {
        super(props);
        this.refTimeList = React.createRef();
    }

    /*
    @desc to load relative time of the default city before to render the component
    */
    componentDidMount () {
        this.citySelectedActionAsync();
        // to store y position of our component when it is mounted
        this.props.positionTimeListUpdate(this.getPosition(this.refTimeList.current));
        // to store the new y position of our component when when window resize is detected
        window.addEventListener('resize', ()=>{
            this.props.positionTimeListUpdate(this.getPosition(this.refTimeList.current));
        });
    }

    /*
    @desc method to calculate y position of an element (TimeList Component)
    @params - (object)
    @return - number
    */
    getPosition =(elements) =>{
        let yPosition = 0;
        while(elements) {
            yPosition += (elements.offsetTop - elements.scrollTop + elements.clientTop);
            elements = elements.offsetParent;
        }
         return yPosition;
    };

    /*
    @desc method to use the props citySelected with async await
    @params - nothing
    @ return - nothing
    */
    citySelectedActionAsync = async ()=> {
        // display loader
        this.props.displayLoader("block");
        await this.props.citySelected();
        //hide loader
        this.props.displayLoader("none");

    };
    /*
    @desc method to render TimeDetails component with right name City
    @params - nothing
    @ return - JSX
    */
    timeTable = () =>{
        return (
            <div className="ui card" style={{width: "95%", margin: "auto", minHeight: "300px"}}>
                <div className="content">
                    <div className="header" style={{width: "75%", margin: "auto"}}>
                        {this.props.relativeTimeReducer.cityName}
                    </div>
                </div>
                <Loader/>
                <div className="content" style={{width: "75%", margin: "auto"}}>
                    <TimeDetails/>
                </div>
            </div>
        );
    };
    render() {
        return <div ref={this.refTimeList}>{this.timeTable()}</div>
    }


};

const mapStateToProps = state => {
    let {relativeTimeReducer,positionTimeListReducer} = state;
    return {relativeTimeReducer,positionTimeListReducer}
};
export default connect(
    mapStateToProps, {citySelected, displayLoader,positionTimeListUpdate}
)(TimeList);

