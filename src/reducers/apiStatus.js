import { assocPath } from 'ramda'

const defaultState = {
    error: null,
}

export default function apiStatus(state = defaultState, action) {
    switch (action.type) {
        case 'API_ERROR':
            return assocPath(['error'], action.payload.error, state)
        case 'API_RECOVERED':
            return assocPath(['error'], null, state)
        default:
            return state
    }
}