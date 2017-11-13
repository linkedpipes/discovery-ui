'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('react-md/lib/Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _CircularProgress = require('react-md/lib/Progress/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _outputDataSamplePreview = require('../components/outputDataSamplePreview');

var _outputDataSamplePreview2 = _interopRequireDefault(_outputDataSamplePreview);

var _actions = require('../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jirihelmich/dev/mff/linkedpipes/discovery-ui/src/components/dataSampleGroup.js';


var DataSampleGroup = function DataSampleGroup(_ref) {
    var dataSampleGroup = _ref.dataSampleGroup,
        discoveryId = _ref.discoveryId,
        exportPipeline = _ref.exportPipeline,
        pipelineData = _ref.pipelineData,
        applicationExecutorUri = _ref.applicationExecutorUri;
    return _react2.default.createElement('li', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 10
        }
    }, _react2.default.createElement('span', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 11
        }
    }, 'Minimal iteration: ', dataSampleGroup.minimalIteration), _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 12
        }
    }, dataSampleGroup.pipeline.descriptor), !pipelineData[dataSampleGroup.pipeline.id] || !pipelineData[dataSampleGroup.pipeline.id].isRunning && !pipelineData[dataSampleGroup.pipeline.id].isSuccess ? _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 16
        }
    }, _react2.default.createElement(_Button2.default, { raised: true, label: 'Run', onClick: function onClick() {
            return exportPipeline(discoveryId, dataSampleGroup.pipeline.id);
        }, __source: {
            fileName: _jsxFileName,
            lineNumber: 17
        }
    }), _react2.default.createElement(_outputDataSamplePreview2.default, { dataSample: dataSampleGroup.pipeline.dataSample, __source: {
            fileName: _jsxFileName,
            lineNumber: 18
        }
    }), _react2.default.createElement('a', { href: applicationExecutorUri + '?service=' + 'http://localhost:9000' + '/discovery/' + discoveryId + '/' + dataSampleGroup.pipeline.id + '/ods/service', __source: {
            fileName: _jsxFileName,
            lineNumber: 19
        }
    }, _react2.default.createElement(_Button2.default, { raised: true, label: 'Show output data sample in app', __source: {
            fileName: _jsxFileName,
            lineNumber: 20
        }
    })), _react2.default.createElement('a', { href: applicationExecutorUri + '?service=' + 'http://localhost:9000' + '/discovery/' + discoveryId + '/' + dataSampleGroup.pipeline.id + '/service', __source: {
            fileName: _jsxFileName,
            lineNumber: 22
        }
    }, _react2.default.createElement(_Button2.default, { raised: true, label: 'Go to app', __source: {
            fileName: _jsxFileName,
            lineNumber: 23
        }
    }))) : null, pipelineData[dataSampleGroup.pipeline.id] && pipelineData[dataSampleGroup.pipeline.id].isRunning && !pipelineData[dataSampleGroup.pipeline.id].isSuccess ? _react2.default.createElement(_CircularProgress2.default, { key: 'progress_pipeline_' + dataSampleGroup.pipeline.id, id: 'progress_pipeline_' + dataSampleGroup.pipeline.id, __source: {
            fileName: _jsxFileName,
            lineNumber: 30
        }
    }) : null, pipelineData[dataSampleGroup.pipeline.id] && !pipelineData[dataSampleGroup.pipeline.id].isRunning && pipelineData[dataSampleGroup.pipeline.id].isSuccess ? _react2.default.createElement('a', { href: applicationExecutorUri + '?service=' + 'http://localhost:9000' + '/discovery/' + discoveryId + '/' + dataSampleGroup.pipeline.id + '/service', __source: {
            fileName: _jsxFileName,
            lineNumber: 35
        }
    }, _react2.default.createElement(_Button2.default, { raised: true, label: 'Go to app', __source: {
            fileName: _jsxFileName,
            lineNumber: 36
        }
    })) : null);
};

var mapStateToProps = function mapStateToProps(state) {
    return { pipelineData: state.discovery.pipelineData };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        exportPipeline: function exportPipeline(discoveryId, pipelineId) {
            return dispatch((0, _actions.exportPipeline)(discoveryId, pipelineId));
        },
        showDataSample: function showDataSample(discoveryId, pipelineId) {
            return dispatch((0, _actions.showDataSample)(discoveryId, pipelineId));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DataSampleGroup);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0YVNhbXBsZUdyb3VwLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiY29ubmVjdCIsIkJ1dHRvbiIsIkNpcmN1bGFyUHJvZ3Jlc3MiLCJPdXRwdXREYXRhU2FtcGxlUHJldmlldyIsImV4cG9ydFBpcGVsaW5lIiwic2hvd0RhdGFTYW1wbGUiLCJEYXRhU2FtcGxlR3JvdXAiLCJkYXRhU2FtcGxlR3JvdXAiLCJkaXNjb3ZlcnlJZCIsInBpcGVsaW5lRGF0YSIsImFwcGxpY2F0aW9uRXhlY3V0b3JVcmkiLCJtaW5pbWFsSXRlcmF0aW9uIiwicGlwZWxpbmUiLCJkZXNjcmlwdG9yIiwiaWQiLCJpc1J1bm5pbmciLCJpc1N1Y2Nlc3MiLCJkYXRhU2FtcGxlIiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJkaXNjb3ZlcnkiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJwaXBlbGluZUlkIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFTOztBQUNULEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVMsQUFBZ0I7Ozs7Ozs7QUFHekIsSUFBTSxrQkFBa0IsU0FBbEIsQUFBa0Isc0JBQUE7UUFBQSxBQUFHLHVCQUFILEFBQUc7UUFBSCxBQUFvQixtQkFBcEIsQUFBb0I7UUFBcEIsQUFBaUMsc0JBQWpDLEFBQWlDO1FBQWpDLEFBQWlELG9CQUFqRCxBQUFpRDtRQUFqRCxBQUErRCw4QkFBL0QsQUFBK0Q7MkJBQ25GLGNBQUE7O3NCQUFBO3dCQUFBLEFBQ0k7QUFESjtBQUFBLEtBQUEsa0JBQ0ksY0FBQTs7c0JBQUE7d0JBQUE7QUFBQTtBQUFBLE9BQTBCLHVDQUQ5QixBQUNJLEFBQTBDLEFBQzFDLG1DQUFBLGNBQUE7O3NCQUFBO3dCQUFBLEFBQ0s7QUFETDtBQUFBLHVCQUNLLEFBQWdCLFNBSHpCLEFBRUksQUFDOEIsQUFFNUIsY0FBQyxhQUFhLGdCQUFBLEFBQWdCLFNBQTlCLEFBQUMsQUFBc0MsT0FBUSxDQUFDLGFBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsSUFBdkMsQUFBMkMsYUFBYSxDQUFDLGFBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsSUFBL0ksQUFBbUosNEJBQ2hKLGNBQUE7O3NCQUFBO3dCQUFBLEFBQ0k7QUFESjtBQUFBLEtBQUEsa0JBQ0ksQUFBQyxrQ0FBTyxRQUFSLE1BQWUsT0FBZixBQUFxQixPQUFNLFNBQVMsbUJBQUE7bUJBQU0sZUFBQSxBQUFlLGFBQWEsZ0JBQUEsQUFBZ0IsU0FBbEQsQUFBTSxBQUFxRDtBQUEvRjtzQkFBQTt3QkFESixBQUNJLEFBQ0E7QUFEQTt3QkFDQSxBQUFDLG1EQUF3QixZQUFZLGdCQUFBLEFBQWdCLFNBQXJELEFBQThEO3NCQUE5RDt3QkFGSixBQUVJLEFBQ0E7QUFEQTt3QkFDQSxjQUFBLE9BQUcsTUFBQSxBQUFTLGlGQUFULEFBQW9FLG9CQUFlLGdCQUFBLEFBQWdCLFNBQW5HLEFBQTRHLEtBQS9HO3NCQUFBO3dCQUFBLEFBQ0k7QUFESjt1QkFDSSxBQUFDLGtDQUFPLFFBQVIsTUFBZSxPQUFmLEFBQXFCO3NCQUFyQjt3QkFKUixBQUdJLEFBQ0ksQUFFSjtBQUZJO3lCQUVKLGNBQUEsT0FBRyxNQUFBLEFBQVMsaUZBQVQsQUFBb0Usb0JBQWUsZ0JBQUEsQUFBZ0IsU0FBbkcsQUFBNEcsS0FBL0c7c0JBQUE7d0JBQUEsQUFDSTtBQURKO3VCQUNJLEFBQUMsa0NBQU8sUUFBUixNQUFlLE9BQWYsQUFBcUI7c0JBQXJCO3dCQVJYLEFBQ0csQUFNSSxBQUNJO0FBQUE7V0FiaEIsQUFnQlEsQUFHRixtQkFBYSxnQkFBQSxBQUFnQixTQUE3QixBQUFzQyxPQUFPLGFBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsSUFBbkYsQUFBdUYsYUFBYSxDQUFDLGFBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsSUFBNUksQUFBZ0osNEJBQzdJLEFBQUMsNENBQWlCLDRCQUEwQixnQkFBQSxBQUFnQixTQUE1RCxBQUFxRSxJQUFNLDJCQUF5QixnQkFBQSxBQUFnQixTQUFwSCxBQUE2SDtzQkFBN0g7d0JBREgsQUFDRztBQUFBO0tBQUEsSUFwQlIsQUFxQlEsQUFHRixtQkFBYSxnQkFBQSxBQUFnQixTQUE3QixBQUFzQyxPQUFPLENBQUMsYUFBYSxnQkFBQSxBQUFnQixTQUE3QixBQUFzQyxJQUFwRixBQUF3RixhQUFhLGFBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsSUFBNUksQUFBZ0osNEJBQzdJLGNBQUEsT0FBRyxNQUFBLEFBQVMsaUZBQVQsQUFBb0Usb0JBQWUsZ0JBQUEsQUFBZ0IsU0FBbkcsQUFBNEcsS0FBL0c7c0JBQUE7d0JBQUEsQUFDSTtBQURKO0tBQUEsa0JBQ0ksQUFBQyxrQ0FBTyxRQUFSLE1BQWUsT0FBZixBQUFxQjtzQkFBckI7d0JBRlAsQUFDRyxBQUNJO0FBQUE7VUEzQlEsQUFDcEIsQUE0QlE7QUE3Qlo7O0FBa0NBLElBQU0sa0JBQWtCLFNBQWxCLEFBQWtCLHVCQUFBO1dBQVUsRUFBRSxjQUFjLE1BQUEsQUFBTSxVQUFoQyxBQUFVLEFBQWdDO0FBQWxFOztBQUVBLElBQU0scUJBQXFCLFNBQXJCLEFBQXFCLDZCQUFZLEFBQ25DOzt3QkFDb0Isd0JBQUEsQUFBQyxhQUFELEFBQWMsWUFBZDttQkFBNkIsU0FBUyw2QkFBQSxBQUFlLGFBQXJELEFBQTZCLEFBQVMsQUFBNEI7QUFEL0UsQUFFSDt3QkFBZ0Isd0JBQUEsQUFBQyxhQUFELEFBQWMsWUFBZDttQkFBNkIsU0FBUyw2QkFBQSxBQUFlLGFBQXJELEFBQTZCLEFBQVMsQUFBNEI7QUFGdEYsQUFBTyxBQUlWO0FBSlUsQUFDSDtBQUZSLEFBT0E7O2tCQUFlLHlCQUFBLEFBQVEsaUJBQVIsQUFBeUIsb0JBQXhDLEFBQWUsQUFBNkMiLCJmaWxlIjoiZGF0YVNhbXBsZUdyb3VwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qaXJpaGVsbWljaC9kZXYvbWZmL2xpbmtlZHBpcGVzL2Rpc2NvdmVyeS11aS9zcmMifQ==