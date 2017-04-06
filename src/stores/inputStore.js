import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {assocPath} from 'ramda';


const defaultState = {
    components: {"a": {uri: "a", label: "a", type: "application"}}
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_ITEM':
            const { uri, active } = action;
            return assocPath(['components', uri, 'active'], !active, state);
        default:
            return state
    }
};

export const toggleItem = (uri, active) => ({ type: 'TOGGLE_ITEM', uri, active });

export const initStore = (initialState = defaultState) => {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
};