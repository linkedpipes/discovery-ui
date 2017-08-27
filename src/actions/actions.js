import fetch from 'isomorphic-fetch'

export const onComponentsFetched = components => ({ type: 'COMPONENTS_FETCHED', components })

export const onDiscoveryStartSuccess = ({ id }) => ({ type: 'DISCOVERY_STARTED', id })

export const onDiscoveryStartFailed = () => ({ type: 'DISCOVERY_START_FAILED', id })

export const onDiscoveryFinished = () => ({ type: 'DISCOVERY_FINISHED' })

export const onDiscoveryStatusUpdated = status => ({ type: 'DISCOVERY_STATUS_UPDATED', status })

export const onPipelineGroupsUpdated = pipelineGroups => ({ type: 'PIPELINE_GROUPS_UPDATED', pipelineGroups })

export const onBackendStatusFetched = isOnline => ({ type: 'BACKEND_STATUS_UPDATED', isOnline })

export const onComponentsFetchError = () => ({ type: 'COMPONENTS_FETCH_ERROR' })

export const onPipelineExported = (discoveryId, pipelineId) => ({ type: 'PIPELINE_EXPORTED', payload: { discoveryId, pipelineId } })

export const toggleDiscoveryInputItem = (uri, isActive, componentType, count) => ({
    type: 'TOGGLE_ITEM',
    uri,
    isActive,
    componentType,
    count,
})

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

export function handleDiscoveryStart(activeComponentUris) {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/start`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(activeComponentUris),
        }).then(
            (success) => {
                return success.json().then(
                    json => dispatch(onDiscoveryStartSuccess(json)),
                    error => dispatch(onDiscoveryStartFailed()),
                ).then(
                    action => dispatch(checkDiscoveryStatus(action.id)),
                )
            },
            error => dispatch(onDiscoveryStartFailed()),
        )
    }
}

const checkDiscoveryStatus = (id) => {
    return dispatch => {
        return fetch(`${BACKEND_URL}/discovery/${id}`, {
            method: 'GET',
        }).then(
            (success) => {
                return success.json().then(
                    newStatus => dispatch(onDiscoveryStatusUpdated(newStatus)),
                    error => console.log(error),
                )
            },
            error => console.log(error),
        ).then(
            action => {
                if (!action.status.isFinished) {
                    dispatch(updatePipelineGroups(id))
                    return dispatch(checkDiscoveryStatus(id))
                } else {
                    dispatch(updatePipelineGroups(id))
                    return dispatch(onDiscoveryFinished())
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
                    ({ pipelineGroups }) => dispatch(onPipelineGroupsUpdated(pipelineGroups)),
                    error => console.log(error),
                )
            },
            error => console.log(error),
        )
    }
}