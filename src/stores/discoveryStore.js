import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { assocPath, values, compose, reduce } from 'ramda'

const defaultState = {
    backendStatus: { isOnline: null },
    inputData: {
        iri: null,
        listIri: null,
        list: null,
        rdf: null,
        components: {},
        iris: null,
    },
    discoveries: {},
    persisted: false,
    multirunnerStatus: {},
    status: {
        discovery: {
            isStarting: false
        }
    }
}

const discovery = {
    id: null,
    status: {
        isFinished: false,
        pipelineCount: 0,
    },
    pipelineData: {},
    pipelineGroups: { applicationGroups: [] },
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'DISCOVERY_STARTED':
            var payload = { ...discovery, id: action.payload.id, inputIri: action.payload.inputIri };
            var a = assocPath(['discoveries', action.payload.id], payload, state);
            var b = assocPath(['status', 'discovery', 'isStarting'], false, a)
            return assocPath(['discoveries', action.payload.inputIri], action.payload.id, b);
        case 'DISCOVERY_STATUS_UPDATED':
            var sx = state
            if (!state.discoveries[action.payload.id])
            {
                sx = assocPath(['discoveries', action.payload.id], { ...discovery, id: action.payload.id }, state)
            }
            return assocPath(['discoveries', action.payload.id, 'status'], action.payload.status, sx)
        case 'PIPELINE_GROUPS_UPDATED':
            return assocPath(['discoveries', action.payload.id, 'pipelineGroups'], action.payload.pipelineGroups, state)
        case 'PIPELINE_EXPORTED':
            const data = { isRunning: true, ...action.payolad }
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId], data, state)
        case 'PIPELINE_EXECUTION_FAILED':
            const s = assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], false, s)
        case 'PIPELINE_EXECUTION_FINISHED':
            const s2 = assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], true, s2)
        case 'BACKEND_STATUS_UPDATED':
            return assocPath(['backendStatus', 'isOnline'], action.payload.isOnline, state)
        case 'TOGGLE_ITEM':
            const { iri, isActive, componentType } = action
            if (iri !== null) {
                return assocPath(['inputData', 'components', componentType, iri, 'isActive'], isActive, state)
            }

            return compose(
                reduce((acc, item) => assocPath(['inputData', 'components', componentType, item.iri, 'isActive'], isActive, acc), state),
                values,
            )(state.inputData.components[componentType])
        case 'COMPONENTS_FETCHED':
            return assocPath(['inputData', 'components'], action.payload.components, state)
        case 'INPUT_IRI_CHANGED':
            return assocPath(['inputData', 'iri'], action.payload.iri, state)
        case 'INPUT_CHANGED':
            return assocPath(['inputData', 'rdf'], action.payload.input, state)
        case 'LIST_IRI_CHANGED':
            return assocPath(['inputData', 'listIri'], action.payload.iri, state)
        case 'STATE_PERSISTED':
            return assocPath(['persisted'], true, state)
        case 'LIST_CHANGED':
            return assocPath(['inputData', 'list'], action.payload.list, state)
        case 'INPUT_IRIS_OBTAINED':
            return assocPath(['inputData', 'iris'], action.payload.inputIris, state)
        case 'MULTIRUNNER_PROGRESS':
            return assocPath(['multirunnerStatus'], action.payload, state)
        case 'DISCOVERY_BEING_CREATED':
            return assocPath(['status'], { discovery: { isStarting: true } }, state)
        case 'DISCOVERY_BEING_CREATED':
            return assocPath(['status', 'discovery', 'isStarting'], true, state)
        case 'ERROR':
            return assocPath(['status', 'error'], action.payload.message, state)
    default:
        return state
    }
}

export const initStore = (initialState = defaultState) => createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
