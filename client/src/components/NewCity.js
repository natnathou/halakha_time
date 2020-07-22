import React from "react";
import {connect} from "react-redux";
import {searchCity,displaySearchList, updateValueSearchBar} from "../actions";

class NewCity extends React.Component{
    state={valueInput: ''};

    onchange = async (event) => {
        let {searchCity, displaySearchList, updateValueSearchBar}=this.props;
        await updateValueSearchBar(event.target.value);
        let {valueSearchBarReducer}=this.props;
        await searchCity(valueSearchBarReducer);
        displaySearchList(true);
    };


    onSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <form className="ui form" onSubmit={this.onSubmit}>
                <div className="field">
                    <div className="ui input action">
                        <input type="text" placeholder="Enter your city" value={this.props.valueSearchBarReducer} onChange={this.onchange} />
                        <button className="ui button teal">search</button>
                    </div>

                </div>
            </form>
        );
    }
}
const mapStateToProps = state => {
    let {valueSearchBarReducer}=state;
    return {valueSearchBarReducer}
};

export default connect(
    mapStateToProps, {searchCity, displaySearchList, updateValueSearchBar}
)(NewCity);
