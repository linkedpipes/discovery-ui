import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { assocPath, values, compose, reduce, filter } from 'ramda'
import asyncActionMiddleware from '../lib/asyncActionMiddleware'

const defaultState = {
    backendStatus: { isOnline: null },
    components: {},
    discovery: {
        id: null,
        status: {
            isFinished: false,
            pipelineCount: 0,
        },
        pipelineGroups: { applicationGroups: [] },
    },
}

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'COMPONENTS_FETCHED':
            return assocPath(['components'], action.components, state)
        case 'DISCOVERY_STARTED':
            return assocPath(['discovery', 'id'], action.id, state)
        case 'DISCOVERY_STATUS_UPDATED':
            return assocPath(['discovery', 'status'], action.status, state)
        case 'PIPELINE_GROUPS_UPDATED':
            return assocPath(['discovery', 'pipelineGroups'], action.pipelineGroups, state)
        case 'TOGGLE_ITEM':
            const { uri, isActive, componentType } = action
            if (uri !== null) {
                return assocPath(['components', componentType, uri, 'isActive'], isActive, state)
            }

            return compose(
                reduce((acc, item) => assocPath(['components', componentType, item.uri, 'isActive'], isActive, acc), state),
                values,
            )(state.components[componentType])
        case 'BACKEND_STATUS_UPDATED':
            return assocPath(['backendStatus', 'isOnline'], action.isOnline, state)
    default:
        return state
    }
}

export const onComponentsFetched = components => ({ type: 'COMPONENTS_FETCHED', components })

export const onDiscoveryStartSuccess = ({ id }) => ({ type: 'DISCOVERY_STARTED', id })

export const onDiscoveryFinished = () => ({ type: 'DISCOVERY_FINISHED' })

export const onDiscoveryStatusUpdated = status => ({ type: 'DISCOVERY_STATUS_UPDATED', status })

export const onPipelineGroupsUpdated = pipelineGroups => ({ type: 'PIPELINE_GROUPS_UPDATED', pipelineGroups })

export const onBackendStatusFetched = isOnline => ({ type: 'BACKEND_STATUS_UPDATED', isOnline })

export const toggleDiscoveryInputItem = (uri, isActive, componentType, count) => ({
    type: 'TOGGLE_ITEM',
    uri,
    isActive,
    componentType,
    count,
})

export const initStore = (initialState = defaultState) => createStore(reducer, initialState, applyMiddleware(asyncActionMiddleware, thunkMiddleware))
