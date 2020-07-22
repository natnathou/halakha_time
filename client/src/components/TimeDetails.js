import React from "react";
import {connect} from "react-redux";


const mapDetail = (props)  => {
    // at initialization relative time is empty so we create the condition below to avoid error when the component will be render
    if (props.relativeTimeReducer.arrayTime !== undefined){
        return (
            // loop relativeRimeReducer to render JSX with all the relative info of the time of each city
            props.relativeTimeReducer.arrayTime.map(data => {
                return (
                    <div className="event" key={data.name}>
                        <div className="ui clearing content">
                            <h4 className="ui left floated header">
                                <div className="sub header">
                                    {data.time}
                                </div>
                            </h4>
                            <h4 className="ui right floated header">
                                <div className="sub header">
                                    :{data.name}
                                </div>
                            </h4>
                        </div>
                    </div>
                );
            })
        );
    }
    return <div></div>
};
const TimeDetails = (props) => {
    return (
           <div className="ui small feed">
               {mapDetail(props)}
           </div>
    );
};



const mapStateToProps = state => {
    let {relativeTimeReducer} = state;
    return {relativeTimeReducer}
};
export default connect(
    mapStateToProps
)(TimeDetails);
