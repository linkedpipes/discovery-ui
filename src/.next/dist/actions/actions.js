'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showDataSample = exports.exportPipeline = exports.setInputIri = exports.toggleDiscoveryInputItem = exports.onExecutionStatusFetched = exports.onPipelineExported = exports.onStatePersisted = exports.onPipelineExecutionFinished = exports.onPipelineExecutionFailed = exports.onComponentsFetchError = exports.onBackendStatusFetched = exports.onPipelineGroupsUpdated = exports.onDiscoveryStatusUpdated = exports.onDiscoveryFinished = exports.onDiscoveryStartFailed = exports.onDiscoveryStartSuccess = exports.onComponentsFetched = undefined;
exports.fetchBackendStatus = fetchBackendStatus;
exports.persistState = persistState;
exports.handleDiscoveryStart = handleDiscoveryStart;
exports.handleDiscoveryStartWithInput = handleDiscoveryStartWithInput;

var _stringify = require('next/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onComponentsFetched = exports.onComponentsFetched = function onComponentsFetched(components) {
    return { type: 'COMPONENTS_FETCHED', components: components };
};

var onDiscoveryStartSuccess = exports.onDiscoveryStartSuccess = function onDiscoveryStartSuccess(_ref) {
    var id = _ref.id;
    return { type: 'DISCOVERY_STARTED', id: id };
};

var onDiscoveryStartFailed = exports.onDiscoveryStartFailed = function onDiscoveryStartFailed() {
    return { type: 'DISCOVERY_START_FAILED', id: id };
};

var onDiscoveryFinished = exports.onDiscoveryFinished = function onDiscoveryFinished() {
    return { type: 'DISCOVERY_FINISHED' };
};

var onDiscoveryStatusUpdated = exports.onDiscoveryStatusUpdated = function onDiscoveryStatusUpdated(status) {
    return { type: 'DISCOVERY_STATUS_UPDATED', status: status };
};

var onPipelineGroupsUpdated = exports.onPipelineGroupsUpdated = function onPipelineGroupsUpdated(pipelineGroups) {
    return { type: 'PIPELINE_GROUPS_UPDATED', pipelineGroups: pipelineGroups };
};

var onBackendStatusFetched = exports.onBackendStatusFetched = function onBackendStatusFetched(isOnline) {
    return { type: 'BACKEND_STATUS_UPDATED', isOnline: isOnline };
};

var onComponentsFetchError = exports.onComponentsFetchError = function onComponentsFetchError() {
    return { type: 'COMPONENTS_FETCH_ERROR' };
};

var onPipelineExecutionFailed = exports.onPipelineExecutionFailed = function onPipelineExecutionFailed(executionIri, pipelineId) {
    return { type: 'PIPELINE_EXECUTION_FAILED', payload: { executionIri: executionIri, pipelineId: pipelineId } };
};

var onPipelineExecutionFinished = exports.onPipelineExecutionFinished = function onPipelineExecutionFinished(executionIri, pipelineId) {
    return { type: 'PIPELINE_EXECUTION_FINISHED', payload: { executionIri: executionIri, pipelineId: pipelineId } };
};

var onStatePersisted = exports.onStatePersisted = function onStatePersisted(discoveryId) {
    return { type: 'STATE_PERSISTED', payload: { discoveryId: discoveryId } };
};

var onPipelineExported = exports.onPipelineExported = function onPipelineExported(exportData) {
    return function (dispatch) {
        dispatch(fetchExecutionStatus(exportData.etlExecutionIri, exportData.pipelineId));
        return dispatch({ type: 'PIPELINE_EXPORTED', payload: exportData });
    };
};

var fetchExecutionStatus = function fetchExecutionStatus(iri, pipelineId) {
    return function (dispatch) {
        (0, _isomorphicFetch2.default)('http://localhost:9000/execution/status?iri=' + iri).then(function (success) {
            success.json().then(function (json) {
                return dispatch(onExecutionStatusFetched(json, iri, pipelineId));
            }, function (error) {});
        }, function (error) {});
    };
};

var onExecutionStatusFetched = exports.onExecutionStatusFetched = function onExecutionStatusFetched(status, executionIri, pipelineId) {
    return function (dispatch) {
        if (status.isQueued || status.isRunning) {
            window.setTimeout(function () {
                return dispatch(fetchExecutionStatus(executionIri, pipelineId));
            }, 1000);
        } else if (status.isFinished) {
            dispatch(onPipelineExecutionFinished(executionIri, pipelineId));
        } else if (status.isFailed) {
            dispatch(onPipelineExecutionFailed(executionIri, pipelineId));
        }
    };
};

var toggleDiscoveryInputItem = exports.toggleDiscoveryInputItem = function toggleDiscoveryInputItem(iri, isActive, componentType, count) {
    return {
        type: 'TOGGLE_ITEM',
        iri: iri,
        isActive: isActive,
        componentType: componentType,
        count: count
    };
};

var setInputIri = exports.setInputIri = function setInputIri(iri) {
    return { type: 'INPUT_IRI_CHANGED', payload: { iri: iri } };
};

function fetchBackendStatus() {
    return function (dispatch) {
        return (0, _isomorphicFetch2.default)('http://localhost:9000/status').then(function (_) {
            (0, _isomorphicFetch2.default)('http://localhost:9000/discovery/components').then(function (success) {
                success.json().then(function (json) {
                    return dispatch(onComponentsFetched(json));
                }, function (error) {
                    return dispatch(onComponentsFetchError());
                });
            }, function (error) {
                return dispatch(onComponentsFetchError());
            });

            return dispatch(onBackendStatusFetched(true));
        }, function (_) {
            //window.setTimeout(checkBackendStatus, 1000)
            return dispatch(onBackendStatusFetched(false));
        });
    };
}

function persistState(state) {
    return function (dispatch) {
        return (0, _isomorphicFetch2.default)('http://localhost:9000/persist', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: (0, _stringify2.default)(state)
        }).then(function (success) {
            return success.json().then(function (json) {
                return dispatch(onStatePersisted(state.discovery.id));
            }, function (error) {
                return dispatch(function () {});
            }).then(function (action) {
                return dispatch(function () {});
            });
        }, function (error) {
            return dispatch(function () {});
        });
    };
}

function handleDiscoveryStart(activeComponentUris) {
    return function (dispatch) {
        return (0, _isomorphicFetch2.default)('http://localhost:9000/discovery/start', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: (0, _stringify2.default)(activeComponentUris)
        }).then(function (success) {
            return success.json().then(function (json) {
                return dispatch(onDiscoveryStartSuccess(json));
            }, function (error) {
                return dispatch(onDiscoveryStartFailed());
            }).then(function (action) {
                return dispatch(checkDiscoveryStatus(action.id));
            });
        }, function (error) {
            return dispatch(onDiscoveryStartFailed());
        });
    };
}

function handleDiscoveryStartWithInput(statusUri) {
    return function (dispatch) {
        return (0, _isomorphicFetch2.default)('http://localhost:9000/discovery/startFromInput?uri=' + statusUri, {
            method: 'GET'
        }).then(function (success) {
            return success.json().then(function (json) {
                return dispatch(onDiscoveryStartSuccess(json));
            }, function (error) {
                return dispatch(onDiscoveryStartFailed());
            }).then(function (action) {
                return dispatch(checkDiscoveryStatus(action.id));
            });
        }, function (error) {
            return dispatch(onDiscoveryStartFailed());
        });
    };
}

var checkDiscoveryStatus = function checkDiscoveryStatus(id) {
    return function (dispatch) {
        return (0, _isomorphicFetch2.default)('http://localhost:9000/discovery/' + id, {
            method: 'GET'
        }).then(function (success) {
            return success.json().then(function (newStatus) {
                return dispatch(onDiscoveryStatusUpdated(newStatus));
            }, function (error) {
                return console.log(error);
            });
        }, function (error) {
            return console.log(error);
        }).then(function (action) {
            if (!action.status.isFinished) {
                dispatch(updatePipelineGroups(id));
                return dispatch(checkDiscoveryStatus(id));
            } else {
                dispatch(updatePipelineGroups(id));
                return dispatch(onDiscoveryFinished());
            }
        });
    };
};

var updatePipelineGroups = function updatePipelineGroups(id) {
    return function (dispatch) {
        (0, _isomorphicFetch2.default)('http://localhost:9000/discovery/' + id + '/pipeline-groups', {
            method: 'GET'
        }).then(function (success) {
            return success.json().then(function (_ref2) {
                var pipelineGroups = _ref2.pipelineGroups;
                return dispatch(onPipelineGroupsUpdated(pipelineGroups));
            }, function (error) {
                return console.log(error);
            });
        }, function (error) {
            return console.log(error);
        });
    };
};

var exportPipeline = exports.exportPipeline = function exportPipeline(discoveryId, pipelineId) {
    return function (dispatch) {
        return (0, _isomorphicFetch2.default)('http://localhost:9000/discovery/' + discoveryId + '/execute/' + pipelineId).then(function (success) {
            return success.json().then(function (json) {
                return dispatch(onPipelineExported(json));
            }, function (error) {});
        }, function (error) {});
    };
};

var showDataSample = exports.showDataSample = function showDataSample(discoveryId, pipelineId) {
    return { type: 'SHOW_DATASAMPLE_CLICKED', payload: { discoveryId: discoveryId, pipelineId: pipelineId } };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMvYWN0aW9ucy5qcyJdLCJuYW1lcyI6WyJmZXRjaCIsIm9uQ29tcG9uZW50c0ZldGNoZWQiLCJ0eXBlIiwiY29tcG9uZW50cyIsIm9uRGlzY292ZXJ5U3RhcnRTdWNjZXNzIiwiaWQiLCJvbkRpc2NvdmVyeVN0YXJ0RmFpbGVkIiwib25EaXNjb3ZlcnlGaW5pc2hlZCIsIm9uRGlzY292ZXJ5U3RhdHVzVXBkYXRlZCIsInN0YXR1cyIsIm9uUGlwZWxpbmVHcm91cHNVcGRhdGVkIiwicGlwZWxpbmVHcm91cHMiLCJvbkJhY2tlbmRTdGF0dXNGZXRjaGVkIiwiaXNPbmxpbmUiLCJvbkNvbXBvbmVudHNGZXRjaEVycm9yIiwib25QaXBlbGluZUV4ZWN1dGlvbkZhaWxlZCIsImV4ZWN1dGlvbklyaSIsInBpcGVsaW5lSWQiLCJwYXlsb2FkIiwib25QaXBlbGluZUV4ZWN1dGlvbkZpbmlzaGVkIiwib25TdGF0ZVBlcnNpc3RlZCIsImRpc2NvdmVyeUlkIiwib25QaXBlbGluZUV4cG9ydGVkIiwiZGlzcGF0Y2giLCJmZXRjaEV4ZWN1dGlvblN0YXR1cyIsImV4cG9ydERhdGEiLCJldGxFeGVjdXRpb25JcmkiLCJpcmkiLCJ0aGVuIiwic3VjY2VzcyIsImpzb24iLCJvbkV4ZWN1dGlvblN0YXR1c0ZldGNoZWQiLCJpc1F1ZXVlZCIsImlzUnVubmluZyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJpc0ZpbmlzaGVkIiwiaXNGYWlsZWQiLCJ0b2dnbGVEaXNjb3ZlcnlJbnB1dEl0ZW0iLCJpc0FjdGl2ZSIsImNvbXBvbmVudFR5cGUiLCJjb3VudCIsInNldElucHV0SXJpIiwiZmV0Y2hCYWNrZW5kU3RhdHVzIiwicGVyc2lzdFN0YXRlIiwic3RhdGUiLCJtZXRob2QiLCJoZWFkZXJzIiwiSGVhZGVycyIsImJvZHkiLCJkaXNjb3ZlcnkiLCJoYW5kbGVEaXNjb3ZlcnlTdGFydCIsImFjdGl2ZUNvbXBvbmVudFVyaXMiLCJjaGVja0Rpc2NvdmVyeVN0YXR1cyIsImFjdGlvbiIsImhhbmRsZURpc2NvdmVyeVN0YXJ0V2l0aElucHV0Iiwic3RhdHVzVXJpIiwibmV3U3RhdHVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidXBkYXRlUGlwZWxpbmVHcm91cHMiLCJleHBvcnRQaXBlbGluZSIsInNob3dEYXRhU2FtcGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFtRU8sQUFBUztRQXdCVCxBQUFTO1FBb0JULEFBQVM7UUFvQlQsQUFBUzs7Ozs7O0FBbkloQixBQUFPLEFBR1A7Ozs7OztBQUFPLElBQU0sb0RBQXNCLFNBQXRCLEFBQXNCLGdDQUFBO1dBQWUsRUFBRSxNQUFGLEFBQVEsc0JBQXNCLFlBQTdDLEFBQWU7QUFBM0MsQUFFUDs7QUFBTyxJQUFNLDREQUEwQixTQUExQixBQUEwQiw4QkFBQTtRQUFBLEFBQUcsVUFBSCxBQUFHO1dBQVUsRUFBRSxNQUFGLEFBQVEscUJBQXFCLElBQTFDLEFBQWE7QUFBN0MsQUFFUDs7QUFBTyxJQUFNLDBEQUF5QixTQUF6QixBQUF5Qix5QkFBQTtXQUFPLEVBQUUsTUFBRixBQUFRLDBCQUEwQixJQUF6QyxBQUFPO0FBQXRDLEFBRVA7O0FBQU8sSUFBTSxvREFBc0IsU0FBdEIsQUFBc0Isc0JBQUE7V0FBTyxFQUFFLE1BQVQsQUFBTyxBQUFRO0FBQTNDLEFBRVA7O0FBQU8sSUFBTSw4REFBMkIsU0FBM0IsQUFBMkIsaUNBQUE7V0FBVyxFQUFFLE1BQUYsQUFBUSw0QkFBNEIsUUFBL0MsQUFBVztBQUE1QyxBQUVQOztBQUFPLElBQU0sNERBQTBCLFNBQTFCLEFBQTBCLHdDQUFBO1dBQW1CLEVBQUUsTUFBRixBQUFRLDJCQUEyQixnQkFBdEQsQUFBbUI7QUFBbkQsQUFFUDs7QUFBTyxJQUFNLDBEQUF5QixTQUF6QixBQUF5QixpQ0FBQTtXQUFhLEVBQUUsTUFBRixBQUFRLDBCQUEwQixVQUEvQyxBQUFhO0FBQTVDLEFBRVA7O0FBQU8sSUFBTSwwREFBeUIsU0FBekIsQUFBeUIseUJBQUE7V0FBTyxFQUFFLE1BQVQsQUFBTyxBQUFR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QVMsQUFBWTtBQVRsQixXQUFBLEFBVUwsS0FDRSxrQkFBVSxBQUNOO2dCQUFJLENBQUMsT0FBQSxBQUFPLE9BQVosQUFBbUIsWUFBWSxBQUMzQjt5QkFBUyxxQkFBVCxBQUFTLEFBQXFCLEFBQzlCO3VCQUFPLFNBQVMscUJBQWhCLEFBQU8sQUFBUyxBQUFxQixBQUN4QztBQUhELG1CQUdPLEFBQ0g7eUJBQVMscUJBQVQsQUFBUyxBQUFxQixBQUM5Qjt1QkFBTyxTQUFQLEFBQU8sQUFBUyxBQUNuQjtBQUNKO0FBbkJMLEFBQU8sQUFxQlY7QUF0QkQsQUF1Qkg7QUF4QkQ7O0FBMEJBLElBQU0sdUJBQXVCLFNBQXZCLEFBQXVCLHFCQUFBLEFBQUMsSUFBTyxBQUNqQztXQUFPLG9CQUFZLEFBQ2Y7NEVBQUEsQUFBa0M7b0JBQWxDLEFBQXdELEFBQzVDO0FBRDRDLEFBQ3BELFdBREosQUFFRyxLQUNDLFVBQUEsQUFBQyxTQUFZLEFBQ1Q7MkJBQU8sQUFBUSxPQUFSLEFBQWUsS0FDbEIsaUJBQUE7b0JBQUEsQUFBRyx1QkFBSCxBQUFHO3VCQUFxQixTQUFTLHdCQUFqQyxBQUF3QixBQUFTLEFBQXdCO0FBRHRELGFBQUEsRUFFSCxpQkFBQTt1QkFBUyxRQUFBLEFBQVEsSUFBakIsQUFBUyxBQUFZO0FBRnpCLEFBQU8sQUFJVjtBQVJMLFdBU0ksaUJBQUE7bUJBQVMsUUFBQSxBQUFRLElBQWpCLEFBQVMsQUFBWTtBQVR6QixBQVdIO0FBWkQsQUFhSDtBQWRELEFBZ0JBOztBQUFPLElBQU0sMENBQWlCLFNBQWpCLEFBQWlCLGVBQUEsQUFBQyxhQUFELEFBQWMsWUFBZSxBQUN2RDtXQUFPLG9CQUFZLEFBQ2Y7bUZBQU8sQUFBa0MsNEJBQWxDLEFBQXlELFlBQXpELEFBQXVFLEtBQzFFLG1CQUFBOzJCQUFXLEFBQVEsT0FBUixBQUFlLEtBQ3RCLGdCQUFRLEFBQ0o7dUJBQU8sU0FBUyxtQkFBaEIsQUFBTyxBQUFTLEFBQW1CLEFBQ3RDO0FBSE0sYUFBQSxFQUlQLGlCQUFTLEFBQUUsQ0FKZixBQUFXO0FBRFIsU0FBQSxFQU9ILGlCQUFTLEFBQUUsQ0FQZixBQUFPLEFBU1Y7QUFWRCxBQVdIO0FBWk0sQUFjUDs7QUFBTyxJQUFNLDBDQUFpQixTQUFqQixBQUFpQixlQUFBLEFBQUMsYUFBRCxBQUFjLFlBQWQ7V0FBOEIsRUFBRSxNQUFGLEFBQVEsMkJBQTJCLFNBQVMsRUFBRSxhQUFGLGFBQWUsWUFBekYsQUFBOEIsQUFBNEM7QUFBakciLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamlyaWhlbG1pY2gvZGV2L21mZi9saW5rZWRwaXBlcy9kaXNjb3ZlcnktdWkvc3JjIn0=