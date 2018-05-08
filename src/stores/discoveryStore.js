import { createStore, applyMiddleware, compose as reduxCompose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { assocPath, values, compose, reduce, endsWith } from 'ramda'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'remote-redux-devtools'

const defaultState = {
    apiStatus: {
        error: null,
    },
    appStatus: {
        error: null,
        isLoading: false
    },
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
        case 'APP_DATA_LOADING_STARTED':
            return assocPath(['appStatus', 'isLoading'], true, state)
        case 'APP_DATA_LOADING_FINISHED':
            return assocPath(['appStatus', 'isLoading'], false, state)
        case 'APP_ERROR':
            return assocPath(['appStatus', 'error'], action.payload.error, state)
        case 'APP_RECOVERED':
            return assocPath(['appStatus', 'error'], null, state)
        case 'API_ERROR':
            return assocPath(['apiStatus', 'error'], action.payload.error, state)
        case 'API_RECOVERED':
            return assocPath(['apiStatus', 'error'], null, state)

        case 'LIST_COMPONENTS_FULFILLED':
            return assocPath(['inputData', 'components'], action.payload, state)
        case 'INPUT_IRI_CHANGED':
            return assocPath(['inputData', 'iri'], action.payload.iri, state)
        case 'INPUT_CHANGED':
            return assocPath(['inputData', 'rdf'], action.payload.input, state)
        case 'LIST_IRI_CHANGED':
            return assocPath(['inputData', 'listIri'], action.payload.iri, state)
        case 'LIST_CHANGED':
            return assocPath(['inputData', 'list'], action.payload.list, state)
        case 'START_DISCOVERY_FULFILLED':
            var payload = { ...discovery, id: action.payload.id, inputIri: action.payload.inputIri };
            state = assocPath(['discoveries', action.payload.id], payload, state)
            state = assocPath(['status', 'discovery', 'isStarting'], false, state)
            return assocPath(['discoveries', action.payload.inputIri], action.payload.id, state);
        case 'UPDATE_DISCOVERY_STATUS_FULFILLED':
            if (!state.discoveries[action.payload.id])
            {
                state = assocPath(['discoveries', action.payload.id], { ...discovery, id: action.payload.id }, state)
            }
            return assocPath(['discoveries', action.payload.id, 'status'], action.payload, state)
        case 'UPDATE_PIPELINE_GROUPS_FULFILLED':
            return assocPath(['discoveries', action.payload.id, 'pipelineGroups'], action.payload.pipelineGroups, state)
        case 'EXPORT_PIPELINE_FULFILLED':
            const data = { isRunning: true, ...action.payolad }
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId], data, state)
        case 'PIPELINE_EXECUTION_FINISHED':
            state = assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], true, state)
        case 'PIPELINE_EXECUTION_FAILED':
            state = assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], false, state)
        case 'TOGGLE_ITEM':
            const { iri, isActive, componentType } = action
            if (iri !== null) {
                return assocPath(['inputData', 'components', componentType, iri, 'isActive'], isActive, state)
            }

            return compose(
                reduce((acc, item) => assocPath(['inputData', 'components', componentType, item.iri, 'isActive'], isActive, acc), state),
                values,
            )(state.inputData.components[componentType])
        case 'PERSIST_STATE_FULFILLED':
            return assocPath(['persisted'], true, state)
        case 'OBTAIN_INPUT_IRIS_FULFILLED':
            return assocPath(['inputData', 'iris'], action.payload.inputIris, state)
        case 'MULTIRUNNER_PROGRESS':
            return assocPath(['multirunnerStatus'], action.payload, state)
    default:
        return state
    }
}


export default function createErrorHandler() {
    return store => next => action => {
        try {
            if (endsWith('_REJECTED', action.type))
            {
                if (action.payload && action.error && action.payload.message)
                {
                    // Thanks, fetch (throws TypeError as payload directly); e.g. CORS.
                    store.dispatch({ type: 'API_ERROR', payload: { error: action.payload } })
                }
                else
                {
                    store.dispatch({ type: 'API_ERROR', payload: action.payload })
                }
                store.dispatch({ type: 'APP_DATA_LOADING_FINISHED' })
            }
            else if (action.payload && action.payload.error && !endsWith('_ERROR', action.type)) 
            {
                store.dispatch({ type: 'APP_ERROR', payload: action.payload })
                store.dispatch({ type: 'APP_DATA_LOADING_FINISHED' })
                // Not sure I want to stop here, but I think I want to. At least for now.
                return;
            }
            else if (endsWith('_PENDING', action.type))
            {
                store.dispatch({ type: 'APP_DATA_LOADING_STARTED' })
                store.dispatch({ type: 'APP_RECOVERED' })
                store.dispatch({ type: 'API_RECOVERED' })
            }
            else if (endsWith('_FULFILLED', action.type))
            {
                store.dispatch({ type: 'APP_DATA_LOADING_FINISHED' })
            }
            return next(action);
        } catch (e) {
            console.log("!!!!", e);
        }
    };
}

export const initStore = (initialState = defaultState) => {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            promiseMiddleware(),
            createLogger({ collapsed: true }),
            createErrorHandler(),
        )
    )
}
