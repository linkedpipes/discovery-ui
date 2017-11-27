import fetch from 'isomorphic-fetch'
import { values, compose, map, filter, mergeAll } from 'ramda'
import Router from 'next/router'

export const onComponentsFetched = components => ({type: 'COMPONENTS_FETCHED', payload: {components}})

export const onDiscoveryStartSuccess = ({ id }) => {
    Router.push({ pathname: '/discovery', query: { id } })
    return ({ type: 'DISCOVERY_STARTED', payload: { id } })
}

export const onDiscoveryStartFailed = (id) => ({type: 'DISCOVERY_START_FAILED', payload: {id}})

export const onDiscoveryFinished = (id) => ({type: 'DISCOVERY_FINISHED', payload: {id}})

export const onDiscoveryStatusUpdated = (id, status) => ({type: 'DISCOVERY_STATUS_UPDATED', payload: {id, status}})

export const onPipelineGroupsUpdated = (id, pipelineGroups) => ({type: 'PIPELINE_GROUPS_UPDATED', payload: {id, pipelineGroups}})

export const onBackendStatusFetched = isOnline => ({type: 'BACKEND_STATUS_UPDATED', payload: {isOnline}})

export const onComponentsFetchError = () => ({type: 'COMPONENTS_FETCH_ERROR'})

export const onPipelineExecutionFailed = (executionIri, pipelineId) => ({
    type: 'PIPELINE_EXECUTION_FAILED',
    payload: {executionIri, pipelineId}
})

export const onPipelineExecutionFinished = (executionIri, pipelineId) => ({
    type: 'PIPELINE_EXECUTION_FINISHED',
    payload: {executionIri, pipelineId}
})

export const onStatePersisted = (discoveryId) => ({type: 'STATE_PERSISTED', payload: {discoveryId}})

export const onPipelineExported = exportData => dispatch => {
    dispatch(fetchExecutionStatus(exportData.etlExecutionIri, exportData.pipelineId))
    return dispatch({type: 'PIPELINE_EXPORTED', payload: exportData});
}

const fetchExecutionStatus = (iri, pipelineId) => dispatch => {
    fetch(`${BACKEND_URL}/execution/status?iri=${iri}`).then(
        (success) => {
            success.json().then(
                json => dispatch(onExecutionStatusFetched(json, iri, pipelineId)),
                error => {
                },
            )
        },
        error => {
        },
    )
}

export const onExecutionStatusFetched = (status, executionIri, pipelineId) => dispatch => {
    if (status.isQueued || status.isRunning) {
        window.setTimeout(() => dispatch(fetchExecutionStatus(executionIri, pipelineId)), 1000)
    }
    else if (status.isFinished) {
        dispatch(onPipelineExecutionFinished(executionIri, pipelineId))
    }
    else if (status.isFailed) {
        dispatch(onPipelineExecutionFailed(executionIri, pipelineId))
    }
}

export const toggleDiscoveryInputItem = (iri, isActive, componentType, count) => ({
    type: 'TOGGLE_ITEM',
    iri,
    isActive,
    componentType,
    count,
})

export const setInputIri = iri => ({type: 'INPUT_IRI_CHANGED', payload: {iri}})

export const setInput = input => ({type: 'INPUT_CHANGED', payload: {input}})

export const setListIri = iri => ({type: 'LIST_IRI_CHANGED', payload: {iri}})

export function fetchBackendStatus() {
    return dispatch => {
        return fetch(`${BACKEND_URL}/status`).then(
            _ => {
                fetch(`${BACKEND_URL}/discovery/components`).then(
                    (success) => {
                        success.json().then(
                            json => dispatch(onComponentsFetched(json)),
                            error => dispatch(onComponentsFetchError()),
                        )
                    },
                    error => dispatch(onComponentsFetchError()),
                )

                return dispatch(onBackendStatusFetched(true))
            },
            _ => {
                //window.setTimeout(checkBackendStatus, 1000)
                return dispatch(onBackendStatusFetched(false))
            }
        )
    }
}

export function handleComponentsSelection(components) {
    const activeComponentIris = compose(
        map(c => c.iri),
        filter(c => c.isActive),
        values,
        mergeAll,
        values,
    )(components)

    return handleDiscoveryStart(activeComponentIris)
}

export function persistState(state) {
    return dispatch => {
        return fetch(`${BACKEND_URL}/persist`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(state),
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onStatePersisted(state.discovery.id)),
                    error => dispatch(() => {
                    }),
                ).then(
                    action => dispatch(() => {
                    }),
                )
            },
            error => dispatch(() => {
            }),
        )
    }
}

export function handleDiscoveryStart(activeComponentUris) {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/start`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(activeComponentUris),
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onDiscoveryStartSuccess(json)),
                    error => dispatch(onDiscoveryStartFailed()),
                )
            },
            error => dispatch(onDiscoveryStartFailed(action.payload.id)),
        )
    }
}

export function handleDiscoveryStartWithInputIri(inputIri) {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/startFromInputIri?iri=${inputIri}`, {
            method: 'GET',
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onDiscoveryStartSuccess(json)),
                    error => dispatch(onDiscoveryStartFailed(action.payload.id)),
                )
            },
            error => dispatch(onDiscoveryStartFailed(action.payload.id)),
        )
    }
}

export function handleDiscoveryStartWithInput(input) {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/startFromInput`, {
            method: 'POST',
            headers: new Headers({'content-type': 'text/plain'}),
            body: input,
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onDiscoveryStartSuccess(json)),
                    error => dispatch(onDiscoveryStartFailed()),
                )
            },
            error => dispatch(onDiscoveryStartFailed()),
        )
    }
}

export const checkDiscoveryStatus = (id) => {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/${id}`, {
            method: 'GET',
        }).then(
            (success) => {
                return success.json().then(
                    newStatus => dispatch(onDiscoveryStatusUpdated(id, newStatus)),
                    error => console.log(error),
                )
            },
            error => console.log(error),
        ).then(
            action => {
                dispatch(updatePipelineGroups(id))
                if (!action.payload.status.isFinished) {
                    return dispatch(checkDiscoveryStatus(id))
                } else {
                    return dispatch(onDiscoveryFinished(id))
                }
            },
        )
    }
}

const updatePipelineGroups = (id) => {
    return dispatch => {
        fetch(`${BACKEND_URL}/discovery/${id}/pipeline-groups`, {
            method: 'GET',
        }).then(
            (success) => {
                return success.json().then(
                    ({pipelineGroups}) => dispatch(onPipelineGroupsUpdated(id, pipelineGroups)),
                    error => console.log(error),
                )
            },
            error => console.log(error),
        )
    }
}

export const exportPipeline = (discoveryId, pipelineId) => {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/${discoveryId}/execute/${pipelineId}`).then(
            success => success.json().then(
                json => {
                    return dispatch(onPipelineExported(json))
                },
                error => {
                }
            ),
            error => {
            }
        )
    }
}

export const showDataSample = (discoveryId, pipelineId) => ({
    type: 'SHOW_DATASAMPLE_CLICKED',
    payload: {discoveryId, pipelineId}
})