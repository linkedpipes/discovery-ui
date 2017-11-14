'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initStore = exports.reducer = undefined;

var _extends2 = require('next\\node_modules\\babel-runtime/helpers/extends');

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
            var uri = action.uri,
                isActive = action.isActive,
                componentType = action.componentType;

            if (uri !== null) {
                return (0, _ramda.assocPath)(['components', componentType, uri, 'isActive'], isActive, state);
            }

            return (0, _ramda.compose)((0, _ramda.reduce)(function (acc, item) {
                return (0, _ramda.assocPath)(['components', componentType, item.uri, 'isActive'], isActive, acc);
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
        case 'INPUT_URI_CHANGED':
            return (0, _ramda.assocPath)(['inputUri'], action.payload.uri, state);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3Jlc1xcZGlzY292ZXJ5U3RvcmUuanMiXSwibmFtZXMiOlsiY3JlYXRlU3RvcmUiLCJhcHBseU1pZGRsZXdhcmUiLCJ0aHVua01pZGRsZXdhcmUiLCJhc3NvY1BhdGgiLCJ2YWx1ZXMiLCJjb21wb3NlIiwicmVkdWNlIiwiZGVmYXVsdFN0YXRlIiwiYmFja2VuZFN0YXR1cyIsImlzT25saW5lIiwiY29tcG9uZW50cyIsImRpc2NvdmVyeSIsImlkIiwic3RhdHVzIiwiaXNGaW5pc2hlZCIsInBpcGVsaW5lQ291bnQiLCJwaXBlbGluZURhdGEiLCJwaXBlbGluZUdyb3VwcyIsImFwcGxpY2F0aW9uR3JvdXBzIiwiaW5wdXRVcmkiLCJwZXJzaXN0ZWQiLCJyZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwidXJpIiwiaXNBY3RpdmUiLCJjb21wb25lbnRUeXBlIiwiYWNjIiwiaXRlbSIsImRhdGEiLCJpc1J1bm5pbmciLCJwYXlvbGFkIiwicGF5bG9hZCIsInBpcGVsaW5lSWQiLCJzIiwiczIiLCJpbml0U3RvcmUiLCJpbml0aWFsU3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQUFBUyxBQUFhOztBQUN0QixBQUFPOzs7O0FBQ1AsQUFBUyxBQUFXLEFBQVEsQUFBUzs7OztBQUVyQyxJQUFNO21CQUNhLEVBQUUsVUFEQSxBQUNGLEFBQVksQUFDM0I7Z0JBRmlCLEFBRUwsQUFDWjs7WUFBVyxBQUNILEFBQ0o7O3dCQUFRLEFBQ1EsQUFDWjsyQkFKRyxBQUVDLEFBRVcsQUFFbkI7QUFKUSxBQUNKO3NCQUhHLEFBTU8sQUFDZDt3QkFBZ0IsRUFBRSxtQkFWTCxBQUdOLEFBT1MsQUFBcUIsQUFFekM7QUFUVyxBQUNQO2NBSmEsQUFZUCxBQUNWO2VBYkosQUFBcUIsQUFhTixBQUdmO0FBaEJxQixBQUNqQjs7QUFlRyxJQUFNLDRCQUFVLFNBQVYsQUFBVSxVQUFrQztRQUFqQyxBQUFpQyw0RUFBekIsQUFBeUI7UUFBWCxBQUFXLG1CQUNyRDs7WUFBUSxPQUFSLEFBQWUsQUFDWDthQUFBLEFBQUssQUFDRDttQkFBTyxzQkFBVSxDQUFWLEFBQVUsQUFBQyxlQUFlLE9BQTFCLEFBQWlDLFlBQXhDLEFBQU8sQUFBNkMsQUFDeEQ7YUFBQSxBQUFLLEFBQ0Q7bUJBQU8sc0JBQVUsQ0FBVixBQUFVLEFBQUMseUNBQW1CLGFBQTlCLEFBQTJDLGFBQVcsSUFBSSxPQUExRCxBQUFpRSxPQUF4RSxBQUFPLEFBQXVFLEFBQ2xGO2FBQUEsQUFBSyxBQUNEO21CQUFPLHNCQUFVLENBQUEsQUFBQyxhQUFYLEFBQVUsQUFBYyxXQUFXLE9BQW5DLEFBQTBDLFFBQWpELEFBQU8sQUFBa0QsQUFDN0Q7YUFBQSxBQUFLLEFBQ0Q7bUJBQU8sc0JBQVUsQ0FBQSxBQUFDLGFBQVgsQUFBVSxBQUFjLG1CQUFtQixPQUEzQyxBQUFrRCxnQkFBekQsQUFBTyxBQUFrRSxBQUM3RTthQUFBLEFBQUs7Z0JBQUwsQUFDWSxNQURaLEFBQzZDLE9BRDdDLEFBQ1k7Z0JBRFosQUFDaUIsV0FEakIsQUFDNkMsT0FEN0MsQUFDaUI7Z0JBRGpCLEFBQzJCLGdCQUQzQixBQUM2QyxPQUQ3QyxBQUMyQixBQUN2Qjs7Z0JBQUksUUFBSixBQUFZLE1BQU0sQUFDZDt1QkFBTyxzQkFBVSxDQUFBLEFBQUMsY0FBRCxBQUFlLGVBQWYsQUFBOEIsS0FBeEMsQUFBVSxBQUFtQyxhQUE3QyxBQUEwRCxVQUFqRSxBQUFPLEFBQW9FLEFBQzlFO0FBRUQ7O21CQUFPLHVDQUNJLFVBQUEsQUFBQyxLQUFELEFBQU0sTUFBTjt1QkFBZSxzQkFBVSxDQUFBLEFBQUMsY0FBRCxBQUFlLGVBQWUsS0FBOUIsQUFBbUMsS0FBN0MsQUFBVSxBQUF3QyxhQUFsRCxBQUErRCxVQUE5RSxBQUFlLEFBQXlFO0FBQS9GLGFBQUEsRUFERyxBQUNILEFBQXFHLEFBQ3JHLHVCQUNGLE1BQUEsQUFBTSxXQUhSLEFBQU8sQUFHTCxBQUFpQixBQUN2QjthQUFBLEFBQUssQUFDRDttQkFBTyxzQkFBVSxDQUFBLEFBQUMsaUJBQVgsQUFBVSxBQUFrQixhQUFhLE9BQXpDLEFBQWdELFVBQXZELEFBQU8sQUFBMEQsQUFDckU7YUFBQSxBQUFLLEFBQ0Q7Z0JBQU0sZ0NBQVMsV0FBVCxBQUFvQixRQUFTLE9BQW5DLEFBQU0sQUFBb0MsQUFDMUM7bUJBQU8sc0JBQVUsQ0FBQSxBQUFDLGFBQUQsQUFBYyxnQkFBZ0IsT0FBQSxBQUFPLFFBQS9DLEFBQVUsQUFBNkMsYUFBdkQsQUFBb0UsTUFBM0UsQUFBTyxBQUEwRSxBQUNyRjthQUFBLEFBQUssQUFDRDtnQkFBTSxJQUFJLHNCQUFVLENBQUEsQUFBQyxhQUFELEFBQWMsZ0JBQWdCLE9BQUEsQUFBTyxRQUFyQyxBQUE2QyxZQUF2RCxBQUFVLEFBQXlELGNBQW5FLEFBQWlGLE9BQTNGLEFBQVUsQUFBd0YsQUFDbEc7bUJBQU8sc0JBQVUsQ0FBQSxBQUFDLGFBQUQsQUFBYyxnQkFBZ0IsT0FBQSxBQUFPLFFBQXJDLEFBQTZDLFlBQXZELEFBQVUsQUFBeUQsY0FBbkUsQUFBaUYsT0FBeEYsQUFBTyxBQUF3RixBQUNuRzthQUFBLEFBQUssQUFDRDtnQkFBTSxLQUFLLHNCQUFVLENBQUEsQUFBQyxhQUFELEFBQWMsZ0JBQWdCLE9BQUEsQUFBTyxRQUFyQyxBQUE2QyxZQUF2RCxBQUFVLEFBQXlELGNBQW5FLEFBQWlGLE9BQTVGLEFBQVcsQUFBd0YsQUFDbkc7bUJBQU8sc0JBQVUsQ0FBQSxBQUFDLGFBQUQsQUFBYyxnQkFBZ0IsT0FBQSxBQUFPLFFBQXJDLEFBQTZDLFlBQXZELEFBQVUsQUFBeUQsY0FBbkUsQUFBaUYsTUFBeEYsQUFBTyxBQUF1RixBQUNsRzthQUFBLEFBQUssQUFDRDttQkFBTyxzQkFBVSxDQUFWLEFBQVUsQUFBQyxhQUFhLE9BQUEsQUFBTyxRQUEvQixBQUF1QyxLQUE5QyxBQUFPLEFBQTRDLEFBQ3ZEO2FBQUEsQUFBSyxBQUNEO21CQUFPLHNCQUFVLENBQVYsQUFBVSxBQUFDLGNBQVgsQUFBeUIsTUFBaEMsQUFBTyxBQUErQixBQUM5QztBQUNJO21CQW5DSixBQW1DSSxBQUFPLEFBRWQ7O0FBdENNLEFBd0NQOztBQUFPLElBQU0sZ0NBQVksU0FBWixBQUFZLFlBQUE7UUFBQSxBQUFDLG1GQUFELEFBQWdCO1dBQWlCLHdCQUFBLEFBQVksU0FBWixBQUFxQixjQUF0RCxBQUFpQyxBQUFtQyxBQUFnQjtBQUF0RyIsImZpbGUiOiJkaXNjb3ZlcnlTdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvbWZmL2Rpc2NvdmVyeS11aS9zcmMifQ==