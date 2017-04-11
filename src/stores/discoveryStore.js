import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { assocPath, values, compose, reduce, filter } from 'ramda';

const defaultState = {
    configuration: {
        apiEndpoint: 'http://localhost:9000'
    },
    components: {
        'http://linked.opendata.cz/ldcp/resource/ldvm/dataset/dblp/template': {
            uri: 'http://linked.opendata.cz/ldcp/resource/ldvm/dataset/dblp/template',
            label: 'DBLP',
            type: 'datasource',
        },
        'http://linked.opendata.cz/ldcp/resource/ldvm/transformer/foaf-maker-to-foaf-made/template': {
            uri: 'http://linked.opendata.cz/ldcp/resource/ldvm/transformer/foaf-maker-to-foaf-made/template',
            label: 'foaf:maker to foaf:made',
            type: 'transformer',
        },
        'http://linked.opendata.cz/ldcp/resource/ldvm/transformer/dct-issued-to-time-instant/template': {
            uri: 'http://linked.opendata.cz/ldcp/resource/ldvm/transformer/dct-issued-to-time-instant/template',
            label: 'dct:issued to time:instant',
            type: 'transformer',
        },
        'http://linked.opendata.cz/ldcp/resource/ldvm/application/personal-profiles/template': {
            uri: 'http://linked.opendata.cz/ldcp/resource/ldvm/application/personal-profiles/template',
            label: 'Personal profiles',
            type: 'application',
        },
    },
}

const onToggleItem = (state, { uri, isActive, componentType }) => {
    if (uri !== null) {
        return assocPath(['components', uri, 'isActive'], isActive, state);
    }

    return compose(
        reduce((acc, item) => assocPath(['components', item.uri, 'isActive'], isActive, acc), state),
        filter(c => c.type === componentType),
        values,
    )(state.components);
}

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
    case 'TOGGLE_ITEM':
        return onToggleItem(state, action)
    case 'DISCOVERY_STARTED':
        console.log("started")
    default:
        return state
    }
}

export const onDiscoveryStartSuccess = (success) => ({ type: 'DISCOVERY_STARTED', success })

export const toggleDiscoveryInputItem = (uri, isActive, componentType, count) => ({
    type: 'TOGGLE_ITEM',
    uri,
    isActive,
    componentType,
    count,
})

export const initStore = (initialState = defaultState) => createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
