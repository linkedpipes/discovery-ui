import { assocPath } from 'ramda'

const defaultState = {}

const discovery = {
    id: null,
    status: {
        isFinished: false,
        pipelineCount: 0,
    },
    pipelineData: {},
    pipelineGroups: { applicationGroups: [] },
};

export default function discoveries(state = defaultState, action) {
    switch (action.type) {
        case 'START_DISCOVERY_FULFILLED':
            var payload = { ...discovery, id: action.payload.id, inputIri: action.payload.inputIri };
            state = assocPath([action.payload.id], payload, state)
            return assocPath([action.payload.inputIri], action.payload.id, state);
        case 'UPDATE_PIPELINE_GROUPS_FULFILLED':
            return assocPath([action.payload.id, 'pipelineGroups'], action.payload.pipelineGroups, state)
        case 'EXPORT_PIPELINE_FULFILLED':
            const data = { isRunning: true, ...action.payolad }
            return assocPath([action.payload.id, 'pipelineData', action.payload.pipelineId], data, state)
        case 'PIPELINE_EXECUTION_FINISHED':
            state = assocPath([action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath([action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], true, state)
        case 'PIPELINE_EXECUTION_FAILED':
            state = assocPath([action.payload.id, 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state)
            return assocPath([action.payload.id, 'pipelineData', action.payload.pipelineId, 'isSuccess'], false, state)
        case 'UPDATE_DISCOVERY_STATUS_FULFILLED':
            if (!state[action.payload.id])
            {
                state = assocPath([action.payload.id], { ...discovery, id: action.payload.id }, state)
            }
            return assocPath([action.payload.id, 'status'], action.payload, state)
        default:
            return state
    }
}