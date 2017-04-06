import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {assocPath} from 'ramda';


const defaultState = {
    components: {
        "http://linked.opendata.cz/ldcp/resource/ldvm/dataset/dblp/template": {uri: "http://linked.opendata.cz/ldcp/resource/ldvm/dataset/dblp/template", label: "DBLP", type: "datasource"},
        "http://linked.opendata.cz/ldcp/resource/ldvm/transformer/foaf-maker-to-foaf-made/template": {uri: "http://linked.opendata.cz/ldcp/resource/ldvm/transformer/foaf-maker-to-foaf-made/template", label: "foaf:maker to foaf:made", type: "transformer"},
        "http://linked.opendata.cz/ldcp/resource/ldvm/transformer/dct-issued-to-time-instant/template": {uri: "http://linked.opendata.cz/ldcp/resource/ldvm/transformer/dct-issued-to-time-instant/template", label: "dct:issued to time:instant", type: "transformer"},
        "http://linked.opendata.cz/ldcp/resource/ldvm/application/personal-profiles/template": {uri: "http://linked.opendata.cz/ldcp/resource/ldvm/application/personal-profiles/template", label: "Personal profiles", type: "application"},
    }
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