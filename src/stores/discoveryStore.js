import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { assocPath, values, compose, reduce } from 'ramda'

const defaultState = {
    backendStatus: { isOnline: null },
    components: {},
    discovery: {
        id: null,
        status: {
            isFinished: false,
            pipelineCount: 0,
        },
        pipelineData: {},
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
            console.log(action)
            if (uri !== null) {
                return assocPath(['components', componentType, uri, 'isActive'], isActive, state)
            }

            return compose(
                reduce((acc, item) => assocPath(['components', componentType, item.uri, 'isActive'], isActive, acc), state),
                values,
            )(state.components[componentType])
        case 'BACKEND_STATUS_UPDATED':
            return assocPath(['backendStatus', 'isOnline'], action.isOnline, state)
        case 'PIPELINE_EXPORTED':
            const data = { isRunning: true, ...action.payolad }
            return assocPath(['discovery', 'pipelineData', action.payload.pipelineId], data, state)
        case 'PIPELINE_EXECUTION_FAILED':
            const s = assocPath(['discovery', 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discovery', 'pipelineData', action.payload.pipelineId, 'isSuccess'], false, s)
        case 'PIPELINE_EXECUTION_FINISHED':
            const s2 = assocPath(['discovery', 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discovery', 'pipelineData', action.payload.pipelineId, 'isSuccess'], true, s2)
    default:
        return state
    }
}

export const initStore = (initialState = defaultState) => createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
