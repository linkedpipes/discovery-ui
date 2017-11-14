'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showDataSample = exports.exportPipeline = exports.setInputUri = exports.toggleDiscoveryInputItem = exports.onExecutionStatusFetched = exports.onPipelineExported = exports.onStatePersisted = exports.onPipelineExecutionFinished = exports.onPipelineExecutionFailed = exports.onComponentsFetchError = exports.onBackendStatusFetched = exports.onPipelineGroupsUpdated = exports.onDiscoveryStatusUpdated = exports.onDiscoveryFinished = exports.onDiscoveryStartFailed = exports.onDiscoveryStartSuccess = exports.onComponentsFetched = undefined;
exports.fetchBackendStatus = fetchBackendStatus;
exports.persistState = persistState;
exports.handleDiscoveryStart = handleDiscoveryStart;
exports.handleDiscoveryStartWithInput = handleDiscoveryStartWithInput;

var _stringify = require('next\\node_modules\\babel-runtime/core-js/json/stringify');

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

var toggleDiscoveryInputItem = exports.toggleDiscoveryInputItem = function toggleDiscoveryInputItem(uri, isActive, componentType, count) {
    return {
        type: 'TOGGLE_ITEM',
        uri: uri,
        isActive: isActive,
        componentType: componentType,
        count: count
    };
};

var setInputUri = exports.setInputUri = function setInputUri(uri) {
    return { type: 'INPUT_URI_CHANGED', payload: { uri: uri } };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnNcXGFjdGlvbnMuanMiXSwibmFtZXMiOlsiZmV0Y2giLCJvbkNvbXBvbmVudHNGZXRjaGVkIiwidHlwZSIsImNvbXBvbmVudHMiLCJvbkRpc2NvdmVyeVN0YXJ0U3VjY2VzcyIsImlkIiwib25EaXNjb3ZlcnlTdGFydEZhaWxlZCIsIm9uRGlzY292ZXJ5RmluaXNoZWQiLCJvbkRpc2NvdmVyeVN0YXR1c1VwZGF0ZWQiLCJzdGF0dXMiLCJvblBpcGVsaW5lR3JvdXBzVXBkYXRlZCIsInBpcGVsaW5lR3JvdXBzIiwib25CYWNrZW5kU3RhdHVzRmV0Y2hlZCIsImlzT25saW5lIiwib25Db21wb25lbnRzRmV0Y2hFcnJvciIsIm9uUGlwZWxpbmVFeGVjdXRpb25GYWlsZWQiLCJleGVjdXRpb25JcmkiLCJwaXBlbGluZUlkIiwicGF5bG9hZCIsIm9uUGlwZWxpbmVFeGVjdXRpb25GaW5pc2hlZCIsIm9uU3RhdGVQZXJzaXN0ZWQiLCJkaXNjb3ZlcnlJZCIsIm9uUGlwZWxpbmVFeHBvcnRlZCIsImRpc3BhdGNoIiwiZmV0Y2hFeGVjdXRpb25TdGF0dXMiLCJleHBvcnREYXRhIiwiZXRsRXhlY3V0aW9uSXJpIiwiaXJpIiwidGhlbiIsInN1Y2Nlc3MiLCJqc29uIiwib25FeGVjdXRpb25TdGF0dXNGZXRjaGVkIiwiaXNRdWV1ZWQiLCJpc1J1bm5pbmciLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiaXNGaW5pc2hlZCIsImlzRmFpbGVkIiwidG9nZ2xlRGlzY292ZXJ5SW5wdXRJdGVtIiwidXJpIiwiaXNBY3RpdmUiLCJjb21wb25lbnRUeXBlIiwiY291bnQiLCJzZXRJbnB1dFVyaSIsImZldGNoQmFja2VuZFN0YXR1cyIsInBlcnNpc3RTdGF0ZSIsInN0YXRlIiwibWV0aG9kIiwiaGVhZGVycyIsIkhlYWRlcnMiLCJib2R5IiwiZGlzY292ZXJ5IiwiaGFuZGxlRGlzY292ZXJ5U3RhcnQiLCJhY3RpdmVDb21wb25lbnRVcmlzIiwiY2hlY2tEaXNjb3ZlcnlTdGF0dXMiLCJhY3Rpb24iLCJoYW5kbGVEaXNjb3ZlcnlTdGFydFdpdGhJbnB1dCIsInN0YXR1c1VyaSIsIm5ld1N0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInVwZGF0ZVBpcGVsaW5lR3JvdXBzIiwiZXhwb3J0UGlwZWxpbmUiLCJzaG93RGF0YVNhbXBsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O1FBbUVPLEFBQVM7UUF3QlQsQUFBUztRQW9CVCxBQUFTO1FBb0JULEFBQVM7Ozs7OztBQW5JaEIsQUFBTyxBQUdQOzs7Ozs7QUFBTyxJQUFNLG9EQUFzQixTQUF0QixBQUFzQixnQ0FBQTtXQUFlLEVBQUUsTUFBRixBQUFRLHNCQUFzQixZQUE3QyxBQUFlO0FBQTNDLEFBRVA7O0FBQU8sSUFBTSw0REFBMEIsU0FBMUIsQUFBMEIsOEJBQUE7UUFBQSxBQUFHLFVBQUgsQUFBRztXQUFVLEVBQUUsTUFBRixBQUFRLHFCQUFxQixJQUExQyxBQUFhO0FBQTdDLEFBRVA7O0FBQU8sSUFBTSwwREFBeUIsU0FBekIsQUFBeUIseUJBQUE7V0FBTyxFQUFFLE1BQUYsQUFBUSwwQkFBMEIsSUFBekMsQUFBTztBQUF0QyxBQUVQOztBQUFPLElBQU0sb0RBQXNCLFNBQXRCLEFBQXNCLHNCQUFBO1dBQU8sRUFBRSxNQUFULEFBQU8sQUFBUTtBQUEzQyxBQUVQOztBQUFPLElBQU0sOERBQTJCLFNBQTNCLEFBQTJCLGlDQUFBO1dBQVcsRUFBRSxNQUFGLEFBQVEsNEJBQTRCLFFBQS9DLEFBQVc7QUFBNUMsQUFFUDs7QUFBTyxJQUFNLDREQUEwQixTQUExQixBQUEwQix3Q0FBQTtXQUFtQixFQUFFLE1BQUYsQUFBUSwyQkFBMkIsZ0JBQXRELEFBQW1CO0FBQW5ELEFBRVA7O0FBQU8sSUFBTSwwREFBeUIsU0FBekIsQUFBeUIsaUNBQUE7V0FBYSxFQUFFLE1BQUYsQUFBUSwwQkFBMEIsVUFBL0MsQUFBYTtBQUE1QyxBQUVQOztBQUFPLElBQU0sMERBQXlCLFNBQXpCLEFBQXlCLHlCQUFBO1dBQU8sRUFBRSxNQUFULEFB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QUFqQixBQUFTLEFBQVk7QUFUbEIsV0FBQSxBQVVMLEtBQ0Usa0JBQVUsQUFDTjtnQkFBSSxDQUFDLE9BQUEsQUFBTyxPQUFaLEFBQW1CLFlBQVksQUFDM0I7eUJBQVMscUJBQVQsQUFBUyxBQUFxQixBQUM5Qjt1QkFBTyxTQUFTLHFCQUFoQixBQUFPLEFBQVMsQUFBcUIsQUFDeEM7QUFIRCxtQkFHTyxBQUNIO3lCQUFTLHFCQUFULEFBQVMsQUFBcUIsQUFDOUI7dUJBQU8sU0FBUCxBQUFPLEFBQVMsQUFDbkI7QUFDSjtBQW5CTCxBQUFPLEFBcUJWO0FBdEJELEFBdUJIO0FBeEJEOztBQTBCQSxJQUFNLHVCQUF1QixTQUF2QixBQUF1QixxQkFBQSxBQUFDLElBQU8sQUFDakM7V0FBTyxvQkFBWSxBQUNmOzRFQUFBLEFBQWtDO29CQUFsQyxBQUF3RCxBQUM1QztBQUQ0QyxBQUNwRCxXQURKLEFBRUcsS0FDQyxVQUFBLEFBQUMsU0FBWSxBQUNUOzJCQUFPLEFBQVEsT0FBUixBQUFlLEtBQ2xCLGlCQUFBO29CQUFBLEFBQUcsdUJBQUgsQUFBRzt1QkFBcUIsU0FBUyx3QkFBakMsQUFBd0IsQUFBUyxBQUF3QjtBQUR0RCxhQUFBLEVBRUgsaUJBQUE7dUJBQVMsUUFBQSxBQUFRLElBQWpCLEFBQVMsQUFBWTtBQUZ6QixBQUFPLEFBSVY7QUFSTCxXQVNJLGlCQUFBO21CQUFTLFFBQUEsQUFBUSxJQUFqQixBQUFTLEFBQVk7QUFUekIsQUFXSDtBQVpELEFBYUg7QUFkRCxBQWdCQTs7QUFBTyxJQUFNLDBDQUFpQixTQUFqQixBQUFpQixlQUFBLEFBQUMsYUFBRCxBQUFjLFlBQWUsQUFDdkQ7V0FBTyxvQkFBWSxBQUNmO21GQUFPLEFBQWtDLDRCQUFsQyxBQUF5RCxZQUF6RCxBQUF1RSxLQUMxRSxtQkFBQTsyQkFBVyxBQUFRLE9BQVIsQUFBZSxLQUN0QixnQkFBUSxBQUNKO3VCQUFPLFNBQVMsbUJBQWhCLEFBQU8sQUFBUyxBQUFtQixBQUN0QztBQUhNLGFBQUEsRUFJUCxpQkFBUyxBQUFFLENBSmYsQUFBVztBQURSLFNBQUEsRUFPSCxpQkFBUyxBQUFFLENBUGYsQUFBTyxBQVNWO0FBVkQsQUFXSDtBQVpNLEFBY1A7O0FBQU8sSUFBTSwwQ0FBaUIsU0FBakIsQUFBaUIsZUFBQSxBQUFDLGFBQUQsQUFBYyxZQUFkO1dBQThCLEVBQUUsTUFBRixBQUFRLDJCQUEyQixTQUFTLEVBQUUsYUFBRixhQUFlLFlBQXpGLEFBQThCLEFBQTRDO0FBQWpHIiwiZmlsZSI6ImFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L21mZi9kaXNjb3ZlcnktdWkvc3JjIn0=