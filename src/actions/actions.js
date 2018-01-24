import fetch from 'isomorphic-fetch'
import { values, compose, map, filter, mergeAll } from 'ramda'
import Router from 'next/router'
import multirunner from '../pages/multirunner';

export const onComponentsFetched = components => ({type: 'COMPONENTS_FETCHED', payload: {components}})

export const onDiscoveryStartSuccess = ({ id }, multirunnerData) => dispatch => {
    if(!multirunnerData)
    {
        Router.push({ pathname: '/discovery', query: { id } })
    } else {
        dispatch(checkDiscoveryStatus(id, multirunnerData))
    }
    return dispatch({ type: 'DISCOVERY_STARTED', payload: { id, inputIri: multirunnerData.inputIris[multirunnerData.current] } })
}

export const discover = (inputData) => dispatch => {
    if (inputData.iri)
    {
        return dispatch(handleDiscoveryStartWithInputIri(inputData.iri));
    }
    if (inputData.rdf)
    {
        return dispatch(handleDiscoveryStartWithInput(inputData.rdf));
    }

    return {}
}

export const goToDetail = (id) => dispatch => {
    Router.push({ pathname: '/discovery', query: { id } })
}

export const onDiscoveryStartFailed = (id) => ({type: 'DISCOVERY_START_FAILED', payload: {id}})

export const onDiscoveryFinished = (id, multirunnerData) => dispatch => {
    if(multirunnerData){
        dispatch(runMultiple(multirunnerData.current+1, multirunnerData.inputIris))
    }
    return dispatch({type: 'DISCOVERY_FINISHED', payload: {id}})
}

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

export const onStatsReceived = ({id}) => dispatch => {
    window.location.href = `${BACKEND_URL}/getStats?id=${id}`;
}

export const runMultiple = (current, inputIris) => dispatch => {
    if(current < inputIris.length) {
        dispatch(handleDiscoveryStartWithInputIri(inputIris[current], { current, inputIris }))
        return dispatch({ type: 'MULTIRUNNER_PROGRESS', payload: { current, inputIris } });
    }
}

export const onInputIrisObtained = inputIris => dispatch => {
    if(inputIris && inputIris.length)
    {
        dispatch(runMultiple(0, inputIris))
    }
    return dispatch({ type: 'INPUT_IRIS_OBTAINED', payload: { inputIris } });
}

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

export const setInputIri = iri => ({ type: 'INPUT_IRI_CHANGED', payload: { iri } })

export const setInput = input => ({ type: 'INPUT_CHANGED', payload: { input } })

export const setListIri = iri => ({ type: 'LIST_IRI_CHANGED', payload: { iri } })

export const setList = list => ({ type: 'LIST_CHANGED', payload: { list } })

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

export function requestStats(discoveries) {
    return dispatch => {    
        const data = compose(
            values,
            map(d => ({ inputIri: d.inputIri, id: d.id })),
            filter(d => typeof d === 'object')
        )(discoveries)

        return fetch(`${BACKEND_URL}/requestStats`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(data),
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onStatsReceived(json)),
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

export function getInputsFromIri(iri){
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/getExperimentsInputIrisFromIri?iri=${iri}`, {
            method: 'GET',
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onInputIrisObtained(json.inputIris)),
                    error => dispatch(() => {}),
                )
            },
            error => dispatch(() => {}),
        )
    };
}

export function getInputs(list){
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/getExperimentsInputIris`, {
            method: 'POST',
            headers: new Headers({'content-type': 'text/plain'}),
            body: list,
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onInputIrisObtained(json.inputIris)),
                    error => dispatch(() => {}),
                ).then(
                    action => dispatch(() => {}),
                )
            },
            error => dispatch(() => {
            }),
        )
    };
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

export function handleDiscoveryStartWithInputIri(inputIri, multirunnerData = null) {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/startFromInputIri?iri=${inputIri}`, {
            method: 'GET',
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onDiscoveryStartSuccess(json, multirunnerData)),
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

export const checkDiscoveryStatus = (id, multirunnerData) => {
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
                    window.setTimeout(() => dispatch(checkDiscoveryStatus(id, multirunnerData)), 1000)
                } else {
                    return dispatch(onDiscoveryFinished(id, multirunnerData))
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
                    json.id = discoveryId;
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
