import React from "react";
import {connect} from "react-redux";
import {citySelected, displaySearchList, updateValueSearchBar, displayLoader} from "../actions"

const ListCityOnSearch = (props) => {
    let {searchCityReducer,citySelected,displaySearchListReducer, displaySearchList, updateValueSearchBar} = props;

    if(searchCityReducer.response && !searchCityReducer.error && displaySearchListReducer){

        return (
            //loop on the result list of ou search
            searchCityReducer.response.data.results.map(
                data => {
                    return (
                        <div role="listitem"
                             className="item"
                             key={data.formatted}
                             onClick={ async () => {
                                 // display our list
                                 displaySearchList(false);
                                 // display loader
                                 props.displayLoader("block");
                                 await citySelected(data.formatted, data.geometry.lat, data.geometry.lng,data.annotations.timezone.name);
                                 // hide our loader
                                 props.displayLoader("none");
                                 // reset the value of the input
                                 updateValueSearchBar("");
                             }
                             }>
                            <div className="content">
                                {data.formatted}
                            </div>
                        </div>
                    );
                }
            )
        );
    } else {
        return <div></div>
    }
};

const mapStateToProps = state => {
    let {searchCityReducer, displaySearchListReducer}=state;
    return {searchCityReducer, displaySearchListReducer}
};

export default connect(
    mapStateToProps, {citySelected,displaySearchList, updateValueSearchBar, displayLoader}
)(ListCityOnSearch);
