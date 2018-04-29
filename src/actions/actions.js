import fetch from 'isomorphic-fetch'
import { values, compose, map, filter, mergeAll } from 'ramda'
import Router from 'next/router'

function handleFetchJsonResponse(response) {
    if (!response.ok) {
        return { error: { message: `${response.url} (${response.status} - ${response.statusText}) ${response.body}` } }
    }
    return response.json().catch(e => { jsonError: e })
}

const getJson = (url) => fetch(`${BACKEND_URL}${url}`).then(handleFetchJsonResponse)

function postJson(url, data) {
    return fetch(`${BACKEND_URL}${url}`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(data),
    }).then(handleFetchJsonResponse)
}

function postText(url, data) {
    return fetch(`${BACKEND_URL}${url}`, {
        method: 'POST',
        headers: new Headers({'content-type': 'text/plain'}),
        body: data,
    }).then(handleFetchJsonResponse)
}

export const getComponents = () => dispatch => dispatch({ type: 'LIST_COMPONENTS', payload: getJson('/discovery/components') })

export const setInputIri = iri => ({ type: 'INPUT_IRI_CHANGED', payload: { iri } })

export const setInput = input => ({ type: 'INPUT_CHANGED', payload: { input } })

export const setListIri = iri => ({ type: 'LIST_IRI_CHANGED', payload: { iri } })

export const setList = list => ({ type: 'LIST_CHANGED', payload: { list } })

export const handleDiscoveryStartWithInputIri = (inputIri, multirunnerData = null) => {
    return dispatch => dispatch({
        type: 'START_DISCOVERY',
        payload: getJson(`/discovery/startFromInputIri?iri=${inputIri}`)
    }).then(({ value, action }) => {
        return dispatch(onDiscoveryStartSuccess(value, multirunnerData))
    })
}

export const handleDiscoveryStartWithInput = (input) => {
    return dispatch => dispatch({ type: 'START_DISCOVERY', payload: postText('/discovery/startFromInput', input) })
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

    throw new Error("Unexpected input.");
}

export const onDiscoveryStartSuccess = ({ id }, multirunnerData) => dispatch => {
    if(!multirunnerData)
    {
        Router.push({ pathname: '/discovery', query: { id } })
    } else {
        return dispatch(checkDiscoveryStatus(id, multirunnerData))
    }
}

export const checkDiscoveryStatus = (id, multirunnerData) => {
    return dispatch => dispatch({
        type: 'UPDATE_DISCOVERY_STATUS',
        payload: getJson(`/discovery/${id}`).then(d => ({ ...d, id }) )  
    }).then (({value, action}) => {
        if (!value.isFinished) {
            window.setTimeout(() => dispatch(checkDiscoveryStatus(id, multirunnerData)), 1000)
        } else {
            if (!multirunnerData)
            {
                dispatch(updatePipelineGroups(id))
            }
            return dispatch(onDiscoveryFinished(id, multirunnerData))
        }
    })
}

export const onDiscoveryFinished = (id, multirunnerData) => dispatch => {
    if (multirunnerData)
    {
        dispatch(runMultiple(multirunnerData.current+1, multirunnerData.inputIris))
    }
    return dispatch({ type: 'DISCOVERY_FINISHED', payload: {id} })
}

const updatePipelineGroups = (id) => {
    return dispatch => dispatch({
        type: 'UPDATE_PIPELINE_GROUPS',
        payload: getJson(`/discovery/${id}/pipeline-groups`).then(d => ({ ...d, id }) )  
    })
}

/*

export const goToDetail = (id) => dispatch => {
    Router.push({ pathname: '/discovery', query: { id } })
}


export const onPipelineGroupsUpdated = (id, pipelineGroups) => ({type: 'PIPELINE_GROUPS_UPDATED', payload: {id, pipelineGroups}})

export const onComponentsFetchError = () => ({type: 'COMPONENTS_FETCH_ERROR'})

export const onPipelineExecutionFailed = (executionIri, pipelineId) => ({
    type: 'PIPELINE_EXECUTION_FAILED',
    payload: {executionIri, pipelineId}
})

export const onPipelineExecutionFinished = (executionIri, pipelineId) => ({
    type: 'PIPELINE_EXECUTION_FINISHED',
    payload: {executionIri, pipelineId}
})

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
    return dispatch => dispatch({ type: 'PERSIST_STATE', payload: postJson('/persist', state)})
}

export function requestStats(discoveries) {
    return dispatch => {    
        const data = compose(
            values,
            map(d => ({ inputIri: d.inputIri, id: d.id })),
            filter(d => typeof d === 'object')
        )(discoveries)
        
        return postJson('/requestStats', data).then(r => window.location.href = `${BACKEND_URL}/getStats?id=${id}`)
    }
}

export function getInputsFromIri(iri) {
    // onInputIrisObtained
    return dispatch => dispatch({ type: 'OBTAIN_INPUT_IRIS', payload: getJsonPromise(`/discovery/getExperimentsInputIrisFromIri?iri=${iri}`)})
}

export function getInputs(list) {
    // onInputIrisObtained
    return dispatch => dispatch({ type: 'OBTAIN_INPUT_IRIS', payload: postText('/discovery/getExperimentsInputIris', list) })
}

export function handleDiscoveryStart(activeComponentUris) {
    return dispatch => dispatch({ type: 'START_DISCOVERY', payload: postJson('/discovery/start', activeComponentUris) })
}

export const exportPipeline = (discoveryId, pipelineId) => {
    return dispatch => dispatch({ type: 'EXPORT_PIPELINE', payload: getJsonPromise(`/discovery/${discoveryId}/execute/${pipelineId}`)})
}

export const showDataSample = (discoveryId, pipelineId) => ({
    type: 'SHOW_DATASAMPLE_CLICKED',
    payload: {discoveryId, pipelineId}
})
*/