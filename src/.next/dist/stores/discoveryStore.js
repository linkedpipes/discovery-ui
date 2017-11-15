'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initStore = exports.reducer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
    backendStatus: { isOnline: null },
    components: {},
    discovery: {
        id: null,
        status: {
            isFinished: false,
            pipelineCount: 0
        },
        pipelineData: {},
        pipelineGroups: { applicationGroups: [] }
    },
    inputUri: null,
    persisted: false
};

var reducer = exports.reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
        case 'COMPONENTS_FETCHED':
            return (0, _ramda.assocPath)(['components'], action.components, state);
        case 'DISCOVERY_STARTED':
            return (0, _ramda.assocPath)(['discovery'], (0, _extends3.default)({}, defaultState.discovery, { id: action.id }), state);
        case 'DISCOVERY_STATUS_UPDATED':
            return (0, _ramda.assocPath)(['discovery', 'status'], action.status, state);
        case 'PIPELINE_GROUPS_UPDATED':
            return (0, _ramda.assocPath)(['discovery', 'pipelineGroups'], action.pipelineGroups, state);
        case 'TOGGLE_ITEM':
            var iri = action.iri,
                isActive = action.isActive,
                componentType = action.componentType;

            if (iri !== null) {
                return (0, _ramda.assocPath)(['components', componentType, iri, 'isActive'], isActive, state);
            }

            return (0, _ramda.compose)((0, _ramda.reduce)(function (acc, item) {
                return (0, _ramda.assocPath)(['components', componentType, item.iri, 'isActive'], isActive, acc);
            }, state), _ramda.values)(state.components[componentType]);
        case 'BACKEND_STATUS_UPDATED':
            return (0, _ramda.assocPath)(['backendStatus', 'isOnline'], action.isOnline, state);
        case 'PIPELINE_EXPORTED':
            var data = (0, _extends3.default)({ isRunning: true }, action.payolad);
            return (0, _ramda.assocPath)(['discovery', 'pipelineData', action.payload.pipelineId], data, state);
        case 'PIPELINE_EXECUTION_FAILED':
            var s = (0, _ramda.assocPath)(['discovery', 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state);
            return (0, _ramda.assocPath)(['discovery', 'pipelineData', action.payload.pipelineId, 'isSuccess'], false, s);
        case 'PIPELINE_EXECUTION_FINISHED':
            var s2 = (0, _ramda.assocPath)(['discovery', 'pipelineData', action.payload.pipelineId, 'isRunning'], false, state);
            return (0, _ramda.assocPath)(['discovery', 'pipelineData', action.payload.pipelineId, 'isSuccess'], true, s2);
        case 'INPUT_IRI_CHANGED':
            return (0, _ramda.assocPath)(['inputIri'], action.payload.iri, state);
        case 'STATE_PERSISTED':
            return (0, _ramda.assocPath)(['persisted'], true, state);
        default:
            return state;
    }
};

var initStore = exports.initStore = function initStore() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    return (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlcy9kaXNjb3ZlcnlTdG9yZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVTdG9yZSIsImFwcGx5TWlkZGxld2FyZSIsInRodW5rTWlkZGxld2FyZSIsImFzc29jUGF0aCIsInZhbHVlcyIsImNvbXBvc2UiLCJyZWR1Y2UiLCJkZWZhdWx0U3RhdGUiLCJiYWNrZW5kU3RhdHVzIiwiaXNPbmxpbmUiLCJjb21wb25lbnRzIiwiZGlzY292ZXJ5IiwiaWQiLCJzdGF0dXMiLCJpc0ZpbmlzaGVkIiwicGlwZWxpbmVDb3VudCIsInBpcGVsaW5lRGF0YSIsInBpcGVsaW5lR3JvdXBzIiwiYXBwbGljYXRpb25Hcm91cHMiLCJpbnB1dFVyaSIsInBlcnNpc3RlZCIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJpcmkiLCJpc0FjdGl2ZSIsImNvbXBvbmVudFR5cGUiLCJhY2MiLCJpdGVtIiwiZGF0YSIsImlzUnVubmluZyIsInBheW9sYWQiLCJwYXlsb2FkIiwicGlwZWxpbmVJZCIsInMiLCJzMiIsImluaXRTdG9yZSIsImluaXRpYWxTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxBQUFTLEFBQWE7O0FBQ3RCLEFBQU87Ozs7QUFDUCxBQUFTLEFBQVcsQUFBUSxBQUFTOzs7O0FBRXJDLElBQU07bUJBQ2EsRUFBRSxVQURBLEFBQ0YsQUFBWSxBQUMzQjtnQkFGaUIsQUFFTCxBQUNaOztZQUFXLEFBQ0gsQUFDSjs7d0JBQVEsQUFDUSxBQUNaOzJCQUpHLEFBRUMsQUFFVyxBQUVuQjtBQUpRLEFBQ0o7c0JBSEcsQUFNTyxBQUNkO3dCQUFnQixFQUFFLG1CQVZMLEFBR04sQUFPUyxBQUFxQixBQUV6QztBQVRXLEFBQ1A7Y0FKYSxBQVlQLEFBQ1Y7ZUFiSixBQUFxQixBQWFOLEFBR2Y7QUFoQnFCLEFBQ2pCOztBQWVHLElBQU0sNEJBQVUsU0FBVixBQUFVLFVBQWtDO1FBQWpDLEFBQWlDLDRFQUF6QixBQUF5QjtRQUFYLEFBQVcsbUJBQ3JEOztZQUFRLE9BQVIsQUFBZSxBQUNYO2FBQUEsQUFBSyxBQUNEO21CQUFPLHNCQUFVLENBQVYsQUFBVSxBQUFDLGVBQWUsT0FBMUIsQUFBaUMsWUFBeEMsQUFBTyxBQUE2QyxBQUN4RDthQUFBLEFBQUssQUFDRDttQkFBTyxzQkFBVSxDQUFWLEFBQVUsQUFBQyx5Q0FBbUIsYUFBOUIsQUFBMkMsYUFBVyxJQUFJLE9BQTFELEFBQWlFLE9BQXhFLEFBQU8sQUFBdUUsQUFDbEY7YUFBQSxBQUFLLEFBQ0Q7bUJBQU8sc0JBQVUsQ0FBQSxBQUFDLGFBQVgsQUFBVSxBQUFjLFdBQVcsT0FBbkMsQUFBMEMsUUFBakQsQUFBTyxBQUFrRCxBQUM3RDthQUFBLEFBQUssQUFDRDttQkFBTyxzQkFBVSxDQUFBLEFBQUMsYUFBWCxBQUFVLEFBQWMsbUJBQW1CLE9BQTNDLEFBQWtELGdCQUF6RCxBQUFPLEFBQWtFLEFBQzdFO2FBQUEsQUFBSztnQkFBTCxBQUNZLE1BRFosQUFDNkMsT0FEN0MsQUFDWTtnQkFEWixBQUNpQixXQURqQixBQUM2QyxPQUQ3QyxBQUNpQjtnQkFEakIsQUFDMkIsZ0JBRDNCLEFBQzZDLE9BRDdDLEFBQzJCLEFBQ3ZCOztnQkFBSSxRQUFKLEFBQVksTUFBTSxBQUNkO3VCQUFPLHNCQUFVLENBQUEsQUFBQyxjQUFELEFBQWUsZUFBZixBQUE4QixLQUF4QyxBQUFVLEFBQW1DLGFBQTdDLEFBQTBELFVBQWpFLEFBQU8sQUFBb0UsQUFDOUU7QUFFRDs7bUJBQU8sdUNBQ0ksVUFBQSxBQUFDLEtBQUQsQUFBTSxNQUFOO3VCQUFlLHNCQUFVLENBQUEsQUFBQyxjQUFELEFBQWUsZUFBZSxLQUE5QixBQUFtQyxLQUE3QyxBQUFVLEFBQXdDLGFBQWxELEFBQStELFVBQTlFLEFBQWUsQUFBeUU7QUFBL0YsYUFBQSxFQURHLEFBQ0gsQUFBcUcsQUFDckcsdUJBQ0YsTUFBQSxBQUFNLFdBSFIsQUFBTyxBQUdMLEFBQWlCLEFBQ3ZCO2FBQUEsQUFBSyxBQUNEO21CQUFPLHNCQUFVLENBQUEsQUFBQyxpQkFBWCxBQUFVLEFBQWtCLGFBQWEsT0FBekMsQUFBZ0QsVUFBdkQsQUFBTyxBQUEwRCxBQUNyRTthQUFBLEFBQUssQUFDRDtnQkFBTSxnQ0FBUyxXQUFULEFBQW9CLFFBQVMsT0FBbkMsQUFBTSxBQUFvQyxBQUMxQzttQkFBTyxzQkFBVSxDQUFBLEFBQUMsYUFBRCxBQUFjLGdCQUFnQixPQUFBLEFBQU8sUUFBL0MsQUFBVSxBQUE2QyxhQUF2RCxBQUFvRSxNQUEzRSxBQUFPLEFBQTBFLEFBQ3JGO2FBQUEsQUFBSyxBQUNEO2dCQUFNLElBQUksc0JBQVUsQ0FBQSxBQUFDLGFBQUQsQUFBYyxnQkFBZ0IsT0FBQSxBQUFPLFFBQXJDLEFBQTZDLFlBQXZELEFBQVUsQUFBeUQsY0FBbkUsQUFBaUYsT0FBM0YsQUFBVSxBQUF3RixBQUNsRzttQkFBTyxzQkFBVSxDQUFBLEFBQUMsYUFBRCxBQUFjLGdCQUFnQixPQUFBLEFBQU8sUUFBckMsQUFBNkMsWUFBdkQsQUFBVSxBQUF5RCxjQUFuRSxBQUFpRixPQUF4RixBQUFPLEFBQXdGLEFBQ25HO2FBQUEsQUFBSyxBQUNEO2dCQUFNLEtBQUssc0JBQVUsQ0FBQSxBQUFDLGFBQUQsQUFBYyxnQkFBZ0IsT0FBQSxBQUFPLFFBQXJDLEFBQTZDLFlBQXZELEFBQVUsQUFBeUQsY0FBbkUsQUFBaUYsT0FBNUYsQUFBVyxBQUF3RixBQUNuRzttQkFBTyxzQkFBVSxDQUFBLEFBQUMsYUFBRCxBQUFjLGdCQUFnQixPQUFBLEFBQU8sUUFBckMsQUFBNkMsWUFBdkQsQUFBVSxBQUF5RCxjQUFuRSxBQUFpRixNQUF4RixBQUFPLEFBQXVGLEFBQ2xHO2FBQUEsQUFBSyxBQUNEO21CQUFPLHNCQUFVLENBQVYsQUFBVSxBQUFDLGFBQWEsT0FBQSxBQUFPLFFBQS9CLEFBQXVDLEtBQTlDLEFBQU8sQUFBNEMsQUFDdkQ7YUFBQSxBQUFLLEFBQ0Q7bUJBQU8sc0JBQVUsQ0FBVixBQUFVLEFBQUMsY0FBWCxBQUF5QixNQUFoQyxBQUFPLEFBQStCLEFBQzlDO0FBQ0k7bUJBbkNKLEFBbUNJLEFBQU8sQUFFZDs7QUF0Q00sQUF3Q1A7O0FBQU8sSUFBTSxnQ0FBWSxTQUFaLEFBQVksWUFBQTtRQUFBLEFBQUMsbUZBQUQsQUFBZ0I7V0FBaUIsd0JBQUEsQUFBWSxTQUFaLEFBQXFCLGNBQXRELEFBQWlDLEFBQW1DLEFBQWdCO0FBQXRHIiwiZmlsZSI6ImRpc2NvdmVyeVN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qaXJpaGVsbWljaC9kZXYvbWZmL2xpbmtlZHBpcGVzL2Rpc2NvdmVyeS11aS9zcmMifQ==