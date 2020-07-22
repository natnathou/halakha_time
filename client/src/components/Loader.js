import React from "react";
import {connect} from "react-redux";

const Loader = (props) =>{
    return (
        <div className="ui active inverted dimmer" style={{display: `${props.displayLoaderReducer}`}}>
            <div className="ui large text loader">Loading</div>
        </div>
    );
};


const mapStateToProps = state => {
    let {displayLoaderReducer} = state;
    return {displayLoaderReducer}
};
export default connect(
    mapStateToProps
)(Loader);

