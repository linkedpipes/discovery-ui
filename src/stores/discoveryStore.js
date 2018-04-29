import { createStore, applyMiddleware, compose as reduxCompose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { assocPath, values, compose, reduce, endsWith } from 'ramda'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'remote-redux-devtools'

const defaultState = {
    apiStatus: { isOnline: true },
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
    appStatus: {
        lastError: null,
        isWorking: false
    },
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
    
    if (endsWith('_PENDING', action.type)) {
        state = assocPath(['appStatus', 'isWorking'], true, state)
        state = assocPath(['appStatus', 'lastError'], null, state)
    } else {
        state = assocPath(['appStatus', 'isWorking'], false, state)

        if (endsWith('_REJECTED', action.type))
        {
            return assocPath(['apiStatus', 'isOnline'], false, state)
        }

        if (action.payload && action.payload.error)
        {
            return assocPath(['appStatus', 'lastError'], action.payload.error, state)
        }
    }

    switch (action.type) {
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
            state = assocPath(['discoveries', action.payload.id], payload, state);
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




        case 'PIPELINE_EXPORTED':
            const data = { isRunning: true, ...action.payolad }
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId], data, state)
        case 'PIPELINE_EXECUTION_FAILED':
            const s = assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], false, s)
        case 'PIPELINE_EXECUTION_FINISHED':
            const s2 = assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath(['discoveries', action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], true, s2)
        case 'TOGGLE_ITEM':
            const { iri, isActive, componentType } = action
            if (iri !== null) {
                return assocPath(['inputData', 'components', componentType, iri, 'isActive'], isActive, state)
            }

            return compose(
                reduce((acc, item) => assocPath(['inputData', 'components', componentType, item.iri, 'isActive'], isActive, acc), state),
                values,
            )(state.inputData.components[componentType])
        
        case 'STATE_PERSISTED':
            return assocPath(['persisted'], true, state)
        case 'INPUT_IRIS_OBTAINED':
            return assocPath(['inputData', 'iris'], action.payload.inputIris, state)
        case 'MULTIRUNNER_PROGRESS':
            return assocPath(['multirunnerStatus'], action.payload, state)
    default:
        return state
    }
}

/*
export default function createErrorReporter() {
    return store => next => action => {
        try {
            if (endsWith('_REJECTED', action.type)) {
                console.log("REJECTED")
            }
            return next(action);
        } catch (e) {
            console.log(e);
        }
    };
}
*/

export const initStore = (initialState = defaultState) => {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            promiseMiddleware(),
            createLogger({ collapsed: true }),
            //createErrorReporter(),
        )
    )
}
