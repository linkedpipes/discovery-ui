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

var _jsxFileName = 'C:\\dev\\mff\\discovery-ui\\src\\components\\dataSampleGroup.js';


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXGRhdGFTYW1wbGVHcm91cC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImNvbm5lY3QiLCJCdXR0b24iLCJDaXJjdWxhclByb2dyZXNzIiwiT3V0cHV0RGF0YVNhbXBsZVByZXZpZXciLCJleHBvcnRQaXBlbGluZSIsInNob3dEYXRhU2FtcGxlIiwiRGF0YVNhbXBsZUdyb3VwIiwiZGF0YVNhbXBsZUdyb3VwIiwiZGlzY292ZXJ5SWQiLCJwaXBlbGluZURhdGEiLCJhcHBsaWNhdGlvbkV4ZWN1dG9yVXJpIiwibWluaW1hbEl0ZXJhdGlvbiIsInBpcGVsaW5lIiwiZGVzY3JpcHRvciIsImlkIiwiaXNSdW5uaW5nIiwiaXNTdWNjZXNzIiwiZGF0YVNhbXBsZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZGlzY292ZXJ5IiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwicGlwZWxpbmVJZCIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBUzs7QUFDVCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFTLEFBQWdCOzs7Ozs7O0FBR3pCLElBQU0sa0JBQWtCLFNBQWxCLEFBQWtCLHNCQUFBO1FBQUEsQUFBRyx1QkFBSCxBQUFHO1FBQUgsQUFBb0IsbUJBQXBCLEFBQW9CO1FBQXBCLEFBQWlDLHNCQUFqQyxBQUFpQztRQUFqQyxBQUFpRCxvQkFBakQsQUFBaUQ7UUFBakQsQUFBK0QsOEJBQS9ELEFBQStEOzJCQUNuRixjQUFBOztzQkFBQTt3QkFBQSxBQUNJO0FBREo7QUFBQSxLQUFBLGtCQUNJLGNBQUE7O3NCQUFBO3dCQUFBO0FBQUE7QUFBQSxPQUEwQix1Q0FEOUIsQUFDSSxBQUEwQyxBQUMxQyxtQ0FBQSxjQUFBOztzQkFBQTt3QkFBQSxBQUNLO0FBREw7QUFBQSx1QkFDSyxBQUFnQixTQUh6QixBQUVJLEFBQzhCLEFBRTVCLGNBQUMsYUFBYSxnQkFBQSxBQUFnQixTQUE5QixBQUFDLEFBQXNDLE9BQVEsQ0FBQyxhQUFhLGdCQUFBLEFBQWdCLFNBQTdCLEFBQXNDLElBQXZDLEFBQTJDLGFBQWEsQ0FBQyxhQUFhLGdCQUFBLEFBQWdCLFNBQTdCLEFBQXNDLElBQS9JLEFBQW1KLDRCQUNoSixjQUFBOztzQkFBQTt3QkFBQSxBQUNJO0FBREo7QUFBQSxLQUFBLGtCQUNJLEFBQUMsa0NBQU8sUUFBUixNQUFlLE9BQWYsQUFBcUIsT0FBTSxTQUFTLG1CQUFBO21CQUFNLGVBQUEsQUFBZSxhQUFhLGdCQUFBLEFBQWdCLFNBQWxELEFBQU0sQUFBcUQ7QUFBL0Y7c0JBQUE7d0JBREosQUFDSSxBQUNBO0FBREE7d0JBQ0EsQUFBQyxtREFBd0IsWUFBWSxnQkFBQSxBQUFnQixTQUFyRCxBQUE4RDtzQkFBOUQ7d0JBRkosQUFFSSxBQUNBO0FBREE7d0JBQ0EsY0FBQSxPQUFHLE1BQUEsQUFBUyxpRkFBVCxBQUFvRSxvQkFBZSxnQkFBQSxBQUFnQixTQUFuRyxBQUE0RyxLQUEvRztzQkFBQTt3QkFBQSxBQUNJO0FBREo7dUJBQ0ksQUFBQyxrQ0FBTyxRQUFSLE1BQWUsT0FBZixBQUFxQjtzQkFBckI7d0JBSlIsQUFHSSxBQUNJLEFBRUo7QUFGSTt5QkFFSixjQUFBLE9BQUcsTUFBQSxBQUFTLGlGQUFULEFBQW9FLG9CQUFlLGdCQUFBLEFBQWdCLFNBQW5HLEFBQTRHLEtBQS9HO3NCQUFBO3dCQUFBLEFBQ0k7QUFESjt1QkFDSSxBQUFDLGtDQUFPLFFBQVIsTUFBZSxPQUFmLEFBQXFCO3NCQUFyQjt3QkFSWCxBQUNHLEFBTUksQUFDSTtBQUFBO1dBYmhCLEFBZ0JRLEFBR0YsbUJBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsT0FBTyxhQUFhLGdCQUFBLEFBQWdCLFNBQTdCLEFBQXNDLElBQW5GLEFBQXVGLGFBQWEsQ0FBQyxhQUFhLGdCQUFBLEFBQWdCLFNBQTdCLEFBQXNDLElBQTVJLEFBQWdKLDRCQUM3SSxBQUFDLDRDQUFpQiw0QkFBMEIsZ0JBQUEsQUFBZ0IsU0FBNUQsQUFBcUUsSUFBTSwyQkFBeUIsZ0JBQUEsQUFBZ0IsU0FBcEgsQUFBNkg7c0JBQTdIO3dCQURILEFBQ0c7QUFBQTtLQUFBLElBcEJSLEFBcUJRLEFBR0YsbUJBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsT0FBTyxDQUFDLGFBQWEsZ0JBQUEsQUFBZ0IsU0FBN0IsQUFBc0MsSUFBcEYsQUFBd0YsYUFBYSxhQUFhLGdCQUFBLEFBQWdCLFNBQTdCLEFBQXNDLElBQTVJLEFBQWdKLDRCQUM3SSxjQUFBLE9BQUcsTUFBQSxBQUFTLGlGQUFULEFBQW9FLG9CQUFlLGdCQUFBLEFBQWdCLFNBQW5HLEFBQTRHLEtBQS9HO3NCQUFBO3dCQUFBLEFBQ0k7QUFESjtLQUFBLGtCQUNJLEFBQUMsa0NBQU8sUUFBUixNQUFlLE9BQWYsQUFBcUI7c0JBQXJCO3dCQUZQLEFBQ0csQUFDSTtBQUFBO1VBM0JRLEFBQ3BCLEFBNEJRO0FBN0JaOztBQWtDQSxJQUFNLGtCQUFrQixTQUFsQixBQUFrQix1QkFBQTtXQUFVLEVBQUUsY0FBYyxNQUFBLEFBQU0sVUFBaEMsQUFBVSxBQUFnQztBQUFsRTs7QUFFQSxJQUFNLHFCQUFxQixTQUFyQixBQUFxQiw2QkFBWSxBQUNuQzs7d0JBQ29CLHdCQUFBLEFBQUMsYUFBRCxBQUFjLFlBQWQ7bUJBQTZCLFNBQVMsNkJBQUEsQUFBZSxhQUFyRCxBQUE2QixBQUFTLEFBQTRCO0FBRC9FLEFBRUg7d0JBQWdCLHdCQUFBLEFBQUMsYUFBRCxBQUFjLFlBQWQ7bUJBQTZCLFNBQVMsNkJBQUEsQUFBZSxhQUFyRCxBQUE2QixBQUFTLEFBQTRCO0FBRnRGLEFBQU8sQUFJVjtBQUpVLEFBQ0g7QUFGUixBQU9BOztrQkFBZSx5QkFBQSxBQUFRLGlCQUFSLEFBQXlCLG9CQUF4QyxBQUFlLEFBQTZDIiwiZmlsZSI6ImRhdGFTYW1wbGVHcm91cC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvbWZmL2Rpc2NvdmVyeS11aS9zcmMifQ==