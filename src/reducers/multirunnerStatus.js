const defaultState = {}

export default function multirunnerStatus(state = defaultState, action) {
    switch (action.type) {
        case 'MULTIRUNNER_PROGRESS':
            return action.payload
        default:
            return state
    }
}