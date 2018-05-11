import fetch from 'isomorphic-fetch'
import { values, compose, map, filter, mergeAll } from 'ramda'
import Router from 'next/router'

function handleFetchJsonResponse(response) {
    if (!response.ok) {
        throw { error: { message: `${response.url} (${response.status} - ${response.statusText})` } };
    }
    return response.json().catch(e => { jsonError: e })
}

const getJson = (url) => fetch(`${BACKEND_URL}${url}`).then(handleFetchJsonResponse)

function postJson(url, data) {
    return fetch(`${BACKEND_URL}${url}`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
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
        payload: getJson(`/discovery/startFromInputIri?iri=${inputIri}`).then(d => ({ ...d, inputIri }))
    }).then(({ value, action }) => {
        return dispatch(onDiscoveryStartSuccess(value, multirunnerData))
    })
}

export const handleDiscoveryStartWithInput = (input) => {
    return dispatch => dispatch({
        type: 'START_DISCOVERY',
        payload: postText('/discovery/startFromInput', input)
    }).then(({ value, action }) => {
        return dispatch(onDiscoveryStartSuccess(value))
    })
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
        dispatch(goToDetail(id))
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
            var result = dispatch(onDiscoveryFinished(id, multirunnerData))
            if (!multirunnerData)
            {
                dispatch(updatePipelineGroups(id))
            }
            return result
        }
    })
}

export const onDiscoveryFinished = (id, multirunnerData) => dispatch => {
    var result = dispatch({ type: 'DISCOVERY_FINISHED', payload: {id} })
    if (multirunnerData)
    {
        dispatch(runMultiple(multirunnerData.current+1, multirunnerData.inputIris))
    }
    return result
}

const updatePipelineGroups = (id) => {
    return dispatch => dispatch({
        type: 'UPDATE_PIPELINE_GROUPS',
        payload: getJson(`/discovery/${id}/pipeline-groups`).then(d => ({ ...d, id }) )  
    })
}

export const goToDetail = (id) => dispatch => {
    Router.push({ pathname: '/discovery', query: { id } })
}

export const exportPipeline = (discoveryId, pipelineId) => {
    return dispatch => dispatch({
        type: 'EXPORT_PIPELINE',
        payload: getJson(`/discovery/${discoveryId}/execute/${pipelineId}`).then(d => ({ id: discoveryId, ...d }))
    }).then(({ value, action }) => {
        return dispatch(fetchExecutionStatus(discoveryId, value.etlExecutionIri, value.pipelineId))
    })
}

const fetchExecutionStatus = (discoveryId, iri, pipelineId) => {
    return dispatch => dispatch({
        type: 'EXECUTION_STATUS',
        payload: getJson(`/execution/status?iri=${iri}`)
    }).then(({ value, action }) => {
        if (value.isQueued || value.isRunning) {
            window.setTimeout(() => dispatch(fetchExecutionStatus(discoveryId, iri, pipelineId)), 1000)
        }
        else if (value.isFinished) {
            dispatch(onPipelineExecutionFinished(discoveryId, iri, pipelineId))
        }
        else if (value.isFailed) {
            dispatch(onPipelineExecutionFailed(discoveryId, iri, pipelineId))
        }
    })
}

export const onPipelineExecutionFailed = (discoveryId, executionIri, pipelineId) => ({
    type: 'PIPELINE_EXECUTION_FAILED',
    payload: { executionIri, pipelineId, id: discoveryId }
})

export const onPipelineExecutionFinished = (discoveryId, executionIri, pipelineId) => ({
    type: 'PIPELINE_EXECUTION_FINISHED',
    payload: { executionIri, pipelineId, id: discoveryId }
})

export const persistState = (state) => {
    return dispatch => dispatch({ type: 'PERSIST_STATE', payload: postJson('/persist', state) })
}

export function getInputsFromIri(iri) {
    return dispatch => dispatch({
        type: 'OBTAIN_INPUT_IRIS',
        payload: getJson(`/discovery/getExperimentsInputIrisFromIri?iri=${iri}`)
    }).then(({ value, action }) => {
        dispatch(onInputIrisObtained(value.inputIris))
    })
}

export function getInputs(list) {
    return dispatch => dispatch({
        type: 'OBTAIN_INPUT_IRIS',
        payload: postText('/discovery/getExperimentsInputIris', list)
    }).then(({ value, action }) => {
        dispatch(onInputIrisObtained(value.inputIris))
    })
}

export const onInputIrisObtained = inputIris => dispatch => {
    if (inputIris && inputIris.length)
    {
        return dispatch(runMultiple(0, inputIris))
    }
}

export const runMultiple = (current, inputIris) => dispatch => {
    if (current < inputIris.length)
    {
        dispatch({ type: 'MULTIRUNNER_PROGRESS', payload: { current, inputIris } })
        return dispatch(handleDiscoveryStartWithInputIri(inputIris[current], { current, inputIris }))
    }
}

export function requestStats(discoveries) {
    return dispatch => {    
        const data = compose(
            values,
            map(d => ({ inputIri: d.inputIri, id: d.id })),
            filter(d => typeof d === 'object')
        )(discoveries)
        
        return postJson('/statistics/request', data).then(r => window.location.href = `${BACKEND_URL}/statistics/get?id=${r.id}`)
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

export function handleDiscoveryStart(activeComponentUris) {
    return dispatch => dispatch({
        type: 'START_DISCOVERY',
        payload: postJson('/discovery/start', activeComponentUris)
    }).then(({ value }) => dispatch(goToDetail(value.id)))
}
