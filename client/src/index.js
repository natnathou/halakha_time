import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import App from "./components/App";
import reducers from "./reducers";
import thunkMiddleware from 'redux-thunk'


ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunkMiddleware)) }>
        <App/>
    </Provider>,
    document.querySelector("#root"));

