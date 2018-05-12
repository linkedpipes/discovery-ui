const defaultState = false

export default function persisted(state = defaultState, action) {
    switch (action.type) {
        case 'PERSIST_STATE_FULFILLED':
            return true
        default:
            return state
    }
}