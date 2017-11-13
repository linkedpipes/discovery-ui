'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _Card = require('react-md/lib/Cards/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardTitle = require('react-md/lib/Cards/CardTitle');

var _CardTitle2 = _interopRequireDefault(_CardTitle);

var _CardText = require('react-md/lib/Cards/CardText');

var _CardText2 = _interopRequireDefault(_CardText);

var _dataSampleGroup = require('./dataSampleGroup');

var _dataSampleGroup2 = _interopRequireDefault(_dataSampleGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jirihelmich/dev/mff/linkedpipes/discovery-ui/src/components/applicationGroup.js';


var renderDataSampleGroups = function renderDataSampleGroups(dataSampleGroups, discoveryId, applicationExecutorUri) {
    return (0, _ramda.compose)((0, _ramda.map)(function (dataSampleGroup) {
        return _react2.default.createElement(_dataSampleGroup2.default, { key: dataSampleGroup.pipeline.id,
            dataSampleGroup: dataSampleGroup,
            discoveryId: discoveryId,
            applicationExecutorUri: applicationExecutorUri,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 10
            }
        });
    }))(dataSampleGroups);
};

var renderExtractorGroups = function renderExtractorGroups(extractorGroups, discoveryId, applicationExecutorUri) {
    return (0, _ramda.compose)((0, _ramda.addIndex)(_ramda.map)(function (extractorGroup, idx) {
        return _react2.default.createElement('li', { key: idx, __source: {
                fileName: _jsxFileName,
                lineNumber: 20
            }
        }, _react2.default.createElement('strong', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 21
            }
        }, (0, _ramda.map)(function (extractor) {
            return _react2.default.createElement('span', { key: extractor.uri, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                }
            }, 'Extractor: ', extractor.label, ' (', extractor.uri, ')');
        }, extractorGroup.extractorInstances)), _react2.default.createElement('ul', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 22
            }
        }, renderDataSampleGroups(extractorGroup.dataSampleGroups, discoveryId, applicationExecutorUri)));
    }))(extractorGroups);
};

var renderDataSourceGroups = function renderDataSourceGroups(dataSourceGroups, discoveryId, applicationExecutorUri) {
    return (0, _ramda.compose)((0, _ramda.addIndex)(_ramda.map)(function (dataSourceGroup, idx) {
        return _react2.default.createElement('li', { key: idx, __source: {
                fileName: _jsxFileName,
                lineNumber: 29
            }
        }, _react2.default.createElement('h4', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 30
            }
        }, (0, _ramda.map)(function (dataSource) {
            return _react2.default.createElement('span', { key: dataSource.uri, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                }
            }, 'Data source: ', dataSource.label, ' (', dataSource.uri, ')');
        }, dataSourceGroup.dataSourceInstances)), _react2.default.createElement('ul', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 31
            }
        }, renderExtractorGroups(dataSourceGroup.extractorGroups, discoveryId, applicationExecutorUri)));
    }))(dataSourceGroups);
};

var ApplicationGroup = function ApplicationGroup(_ref) {
    var applicationGroup = _ref.applicationGroup,
        discoveryId = _ref.discoveryId;
    return _react2.default.createElement(_Card2.default, { key: applicationGroup.applicationInstance.uri, __source: {
            fileName: _jsxFileName,
            lineNumber: 37
        }
    }, _react2.default.createElement(_CardTitle2.default, {
        title: applicationGroup.applicationInstance.label,
        subtitle: applicationGroup.applicationInstance.uri,
        __source: {
            fileName: _jsxFileName,
            lineNumber: 38
        }
    }), _react2.default.createElement(_CardText2.default, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 42
        }
    }, _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 43
        }
    }, _react2.default.createElement('ul', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 44
        }
    }, renderDataSourceGroups(applicationGroup.dataSourceGroups, discoveryId, applicationGroup.applicationInstance.executorUri)))));
};

exports.default = ApplicationGroup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwbGljYXRpb25Hcm91cC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImFkZEluZGV4IiwibWFwIiwiY29tcG9zZSIsIkNhcmQiLCJDYXJkVGl0bGUiLCJDYXJkVGV4dCIsIkRhdGFTYW1wbGVHcm91cCIsInJlbmRlckRhdGFTYW1wbGVHcm91cHMiLCJkYXRhU2FtcGxlR3JvdXBzIiwiZGlzY292ZXJ5SWQiLCJhcHBsaWNhdGlvbkV4ZWN1dG9yVXJpIiwiZGF0YVNhbXBsZUdyb3VwIiwicGlwZWxpbmUiLCJpZCIsInJlbmRlckV4dHJhY3Rvckdyb3VwcyIsImV4dHJhY3Rvckdyb3VwcyIsImV4dHJhY3Rvckdyb3VwIiwiaWR4IiwiZXh0cmFjdG9yIiwidXJpIiwibGFiZWwiLCJleHRyYWN0b3JJbnN0YW5jZXMiLCJyZW5kZXJEYXRhU291cmNlR3JvdXBzIiwiZGF0YVNvdXJjZUdyb3VwcyIsImRhdGFTb3VyY2VHcm91cCIsImRhdGFTb3VyY2UiLCJkYXRhU291cmNlSW5zdGFuY2VzIiwiQXBwbGljYXRpb25Hcm91cCIsImFwcGxpY2F0aW9uR3JvdXAiLCJhcHBsaWNhdGlvbkluc3RhbmNlIiwiZXhlY3V0b3JVcmkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFTLEFBQVUsQUFBSzs7QUFDeEIsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7Ozs7Ozs7O0FBRVAsSUFBTSx5QkFBeUIsU0FBekIsQUFBeUIsdUJBQUEsQUFBQyxrQkFBRCxBQUFtQixhQUFuQixBQUFnQyx3QkFBaEM7K0NBQ3ZCLDJCQUFBOytCQUNBLEFBQUMsMkNBQWdCLEtBQUssZ0JBQUEsQUFBZ0IsU0FBdEMsQUFBK0MsQUFDM0M7NkJBREosQUFDcUIsQUFDakI7eUJBRkosQUFFaUIsQUFDYjtvQ0FISixBQUc0Qjs7MEJBSDVCOzRCQURBLEFBQ0E7QUFBQTtTQUFBO0FBRmtGLEFBQ3RGLEtBQUEsQ0FEc0YsRUFBM0QsQUFBMkQsQUFReEY7QUFSRjs7QUFVQSxJQUFNLHdCQUF3QixTQUF4QixBQUF3QixzQkFBQSxBQUFDLGlCQUFELEFBQWtCLGFBQWxCLEFBQStCLHdCQUEvQjtnRUFDWixVQUFBLEFBQUMsZ0JBQUQsQUFBaUIsS0FBakI7K0JBQ1YsY0FBQSxRQUFJLEtBQUosQUFBUzswQkFBVDs0QkFBQSxBQUNJO0FBREo7U0FBQSxrQkFDSSxjQUFBOzswQkFBQTs0QkFBQSxBQUFTO0FBQVQ7QUFBQSwyQkFBYSxxQkFBQTttQ0FBYyxjQUFBLFVBQU0sS0FBSyxVQUFYLEFBQXFCOzhCQUFyQjtnQ0FBQTtBQUFBO2FBQUEsRUFBc0MseUJBQXRDLEFBQWdELE9BQVMsZ0JBQXpELEFBQW1FLEtBQWpGLEFBQWM7QUFBbEIsV0FBb0csZUFEakgsQUFDSSxBQUFTLEFBQW1ILEFBQzVILHNDQUFBLGNBQUE7OzBCQUFBOzRCQUFBLEFBQUs7QUFBTDtBQUFBLGtDQUE0QixlQUF2QixBQUFzQyxrQkFBdEMsQUFBd0QsYUFIdkQsQUFDVixBQUVJLEFBQUssQUFBcUU7QUFKRSxBQUNwRixLQUFBLEFBQVMsQ0FEMkUsRUFBMUQsQUFBMEQsQUFPdEY7QUFQRjs7QUFTQSxJQUFNLHlCQUF5QixTQUF6QixBQUF5Qix1QkFBQSxBQUFDLGtCQUFELEFBQW1CLGFBQW5CLEFBQWdDLHdCQUFoQztnRUFDYixVQUFBLEFBQUMsaUJBQUQsQUFBa0IsS0FBbEI7K0JBQ1YsY0FBQSxRQUFJLEtBQUosQUFBUzswQkFBVDs0QkFBQSxBQUNJO0FBREo7U0FBQSxrQkFDSSxjQUFBOzswQkFBQTs0QkFBQSxBQUFLO0FBQUw7QUFBQSwyQkFBUyxzQkFBQTttQ0FBZSxjQUFBLFVBQU0sS0FBSyxXQUFYLEFBQXNCOzhCQUF0QjtnQ0FBQTtBQUFBO2FBQUEsRUFBeUMsNEJBQXpDLEFBQW9ELE9BQVMsaUJBQTdELEFBQXdFLEtBQXZGLEFBQWU7QUFBbkIsV0FBMEcsZ0JBRG5ILEFBQ0ksQUFBSyxBQUEwSCxBQUMvSCx1Q0FBQSxjQUFBOzswQkFBQTs0QkFBQSxBQUFLO0FBQUw7QUFBQSxpQ0FBMkIsZ0JBQXRCLEFBQXNDLGlCQUF0QyxBQUF1RCxhQUh0RCxBQUNWLEFBRUksQUFBSyxBQUFvRTtBQUpLLEFBQ3RGLEtBQUEsQUFBUyxDQUQ2RSxFQUEzRCxBQUEyRCxBQU94RjtBQVBGOztBQVNBLElBQU0sbUJBQW1CLFNBQW5CLEFBQW1CLHVCQUFBO1FBQUEsQUFBRyx3QkFBSCxBQUFHO1FBQUgsQUFBcUIsbUJBQXJCLEFBQXFCOzJCQUMxQyxBQUFDLGdDQUFLLEtBQUssaUJBQUEsQUFBaUIsb0JBQTVCLEFBQWdEO3NCQUFoRDt3QkFBQSxBQUNJO0FBREo7S0FBQSxrQkFDSSxBQUFDO2VBQ1UsaUJBQUEsQUFBaUIsb0JBRDVCLEFBQ2dELEFBQzVDO2tCQUFVLGlCQUFBLEFBQWlCLG9CQUYvQixBQUVtRDs7c0JBRm5EO3dCQURKLEFBQ0ksQUFJQTtBQUpBO0FBQ0ksd0JBR0osQUFBQzs7c0JBQUQ7d0JBQUEsQUFDSTtBQURKO0FBQUEsdUJBQ0ksY0FBQTs7c0JBQUE7d0JBQUEsQUFDSTtBQURKO0FBQUEsdUJBQ0ksY0FBQTs7c0JBQUE7d0JBQUEsQUFBSztBQUFMO0FBQUEsOEJBQTRCLGlCQUF2QixBQUF3QyxrQkFBeEMsQUFBMEQsYUFBYSxpQkFBQSxBQUFpQixvQkFScEYsQUFDckIsQUFLSSxBQUNJLEFBQ0ksQUFBSyxBQUE0RztBQVJqSSxBQWNBOztrQkFBQSxBQUFlIiwiZmlsZSI6ImFwcGxpY2F0aW9uR3JvdXAuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2ppcmloZWxtaWNoL2Rldi9tZmYvbGlua2VkcGlwZXMvZGlzY292ZXJ5LXVpL3NyYyJ9