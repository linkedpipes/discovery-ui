import { assocPath } from 'ramda'

const defaultState = {
    error: null,
    isLoading: false,
}

export default function appStatus(state = defaultState, action) {
    switch (action.type) {
        case 'APP_DATA_LOADING_STARTED':
            return assocPath(['isLoading'], true, state)
        case 'APP_DATA_LOADING_FINISHED':
            return assocPath(['isLoading'], false, state)
        case 'APP_ERROR':
            return assocPath(['error'], action.payload.error, state)
        case 'APP_RECOVERED':
            return assocPath(['error'], null, state)
        default:
            return state
    }
}