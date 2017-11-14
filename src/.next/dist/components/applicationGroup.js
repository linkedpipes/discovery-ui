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

var _jsxFileName = 'C:\\dev\\mff\\discovery-ui\\src\\components\\applicationGroup.js';


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXGFwcGxpY2F0aW9uR3JvdXAuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJhZGRJbmRleCIsIm1hcCIsImNvbXBvc2UiLCJDYXJkIiwiQ2FyZFRpdGxlIiwiQ2FyZFRleHQiLCJEYXRhU2FtcGxlR3JvdXAiLCJyZW5kZXJEYXRhU2FtcGxlR3JvdXBzIiwiZGF0YVNhbXBsZUdyb3VwcyIsImRpc2NvdmVyeUlkIiwiYXBwbGljYXRpb25FeGVjdXRvclVyaSIsImRhdGFTYW1wbGVHcm91cCIsInBpcGVsaW5lIiwiaWQiLCJyZW5kZXJFeHRyYWN0b3JHcm91cHMiLCJleHRyYWN0b3JHcm91cHMiLCJleHRyYWN0b3JHcm91cCIsImlkeCIsImV4dHJhY3RvciIsInVyaSIsImxhYmVsIiwiZXh0cmFjdG9ySW5zdGFuY2VzIiwicmVuZGVyRGF0YVNvdXJjZUdyb3VwcyIsImRhdGFTb3VyY2VHcm91cHMiLCJkYXRhU291cmNlR3JvdXAiLCJkYXRhU291cmNlIiwiZGF0YVNvdXJjZUluc3RhbmNlcyIsIkFwcGxpY2F0aW9uR3JvdXAiLCJhcHBsaWNhdGlvbkdyb3VwIiwiYXBwbGljYXRpb25JbnN0YW5jZSIsImV4ZWN1dG9yVXJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBUyxBQUFVLEFBQUs7O0FBQ3hCLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7Ozs7OztBQUVQLElBQU0seUJBQXlCLFNBQXpCLEFBQXlCLHVCQUFBLEFBQUMsa0JBQUQsQUFBbUIsYUFBbkIsQUFBZ0Msd0JBQWhDOytDQUN2QiwyQkFBQTsrQkFDQSxBQUFDLDJDQUFnQixLQUFLLGdCQUFBLEFBQWdCLFNBQXRDLEFBQStDLEFBQzNDOzZCQURKLEFBQ3FCLEFBQ2pCO3lCQUZKLEFBRWlCLEFBQ2I7b0NBSEosQUFHNEI7OzBCQUg1Qjs0QkFEQSxBQUNBO0FBQUE7U0FBQTtBQUZrRixBQUN0RixLQUFBLENBRHNGLEVBQTNELEFBQTJELEFBUXhGO0FBUkY7O0FBVUEsSUFBTSx3QkFBd0IsU0FBeEIsQUFBd0Isc0JBQUEsQUFBQyxpQkFBRCxBQUFrQixhQUFsQixBQUErQix3QkFBL0I7Z0VBQ1osVUFBQSxBQUFDLGdCQUFELEFBQWlCLEtBQWpCOytCQUNWLGNBQUEsUUFBSSxLQUFKLEFBQVM7MEJBQVQ7NEJBQUEsQUFDSTtBQURKO1NBQUEsa0JBQ0ksY0FBQTs7MEJBQUE7NEJBQUEsQUFBUztBQUFUO0FBQUEsMkJBQWEscUJBQUE7bUNBQWMsY0FBQSxVQUFNLEtBQUssVUFBWCxBQUFxQjs4QkFBckI7Z0NBQUE7QUFBQTthQUFBLEVBQXNDLHlCQUF0QyxBQUFnRCxPQUFTLGdCQUF6RCxBQUFtRSxLQUFqRixBQUFjO0FBQWxCLFdBQW9HLGVBRGpILEFBQ0ksQUFBUyxBQUFtSCxBQUM1SCxzQ0FBQSxjQUFBOzswQkFBQTs0QkFBQSxBQUFLO0FBQUw7QUFBQSxrQ0FBNEIsZUFBdkIsQUFBc0Msa0JBQXRDLEFBQXdELGFBSHZELEFBQ1YsQUFFSSxBQUFLLEFBQXFFO0FBSkUsQUFDcEYsS0FBQSxBQUFTLENBRDJFLEVBQTFELEFBQTBELEFBT3RGO0FBUEY7O0FBU0EsSUFBTSx5QkFBeUIsU0FBekIsQUFBeUIsdUJBQUEsQUFBQyxrQkFBRCxBQUFtQixhQUFuQixBQUFnQyx3QkFBaEM7Z0VBQ2IsVUFBQSxBQUFDLGlCQUFELEFBQWtCLEtBQWxCOytCQUNWLGNBQUEsUUFBSSxLQUFKLEFBQVM7MEJBQVQ7NEJBQUEsQUFDSTtBQURKO1NBQUEsa0JBQ0ksY0FBQTs7MEJBQUE7NEJBQUEsQUFBSztBQUFMO0FBQUEsMkJBQVMsc0JBQUE7bUNBQWUsY0FBQSxVQUFNLEtBQUssV0FBWCxBQUFzQjs4QkFBdEI7Z0NBQUE7QUFBQTthQUFBLEVBQXlDLDRCQUF6QyxBQUFvRCxPQUFTLGlCQUE3RCxBQUF3RSxLQUF2RixBQUFlO0FBQW5CLFdBQTBHLGdCQURuSCxBQUNJLEFBQUssQUFBMEgsQUFDL0gsdUNBQUEsY0FBQTs7MEJBQUE7NEJBQUEsQUFBSztBQUFMO0FBQUEsaUNBQTJCLGdCQUF0QixBQUFzQyxpQkFBdEMsQUFBdUQsYUFIdEQsQUFDVixBQUVJLEFBQUssQUFBb0U7QUFKSyxBQUN0RixLQUFBLEFBQVMsQ0FENkUsRUFBM0QsQUFBMkQsQUFPeEY7QUFQRjs7QUFTQSxJQUFNLG1CQUFtQixTQUFuQixBQUFtQix1QkFBQTtRQUFBLEFBQUcsd0JBQUgsQUFBRztRQUFILEFBQXFCLG1CQUFyQixBQUFxQjsyQkFDMUMsQUFBQyxnQ0FBSyxLQUFLLGlCQUFBLEFBQWlCLG9CQUE1QixBQUFnRDtzQkFBaEQ7d0JBQUEsQUFDSTtBQURKO0tBQUEsa0JBQ0ksQUFBQztlQUNVLGlCQUFBLEFBQWlCLG9CQUQ1QixBQUNnRCxBQUM1QztrQkFBVSxpQkFBQSxBQUFpQixvQkFGL0IsQUFFbUQ7O3NCQUZuRDt3QkFESixBQUNJLEFBSUE7QUFKQTtBQUNJLHdCQUdKLEFBQUM7O3NCQUFEO3dCQUFBLEFBQ0k7QUFESjtBQUFBLHVCQUNJLGNBQUE7O3NCQUFBO3dCQUFBLEFBQ0k7QUFESjtBQUFBLHVCQUNJLGNBQUE7O3NCQUFBO3dCQUFBLEFBQUs7QUFBTDtBQUFBLDhCQUE0QixpQkFBdkIsQUFBd0Msa0JBQXhDLEFBQTBELGFBQWEsaUJBQUEsQUFBaUIsb0JBUnBGLEFBQ3JCLEFBS0ksQUFDSSxBQUNJLEFBQUssQUFBNEc7QUFSakksQUFjQTs7a0JBQUEsQUFBZSIsImZpbGUiOiJhcHBsaWNhdGlvbkdyb3VwLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9tZmYvZGlzY292ZXJ5LXVpL3NyYyJ9