'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _applicationGroup = require('./applicationGroup');

var _applicationGroup2 = _interopRequireDefault(_applicationGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\dev\\mff\\discovery-ui\\src\\components\\pipelineGroups.js';


var PipelineGroups = function PipelineGroups(_ref) {
    var pipelineGroups = _ref.pipelineGroups,
        discoveryId = _ref.discoveryId;
    return _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 6
        }
    }, _react2.default.createElement('br', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        }
    }), (0, _ramda.compose)((0, _ramda.map)(function (applicationGroup) {
        return _react2.default.createElement('div', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 10
            }
        }, _react2.default.createElement(_applicationGroup2.default, {
            key: applicationGroup.applicationInstance.uri,
            applicationGroup: applicationGroup,
            discoveryId: discoveryId,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 11
            }
        }), _react2.default.createElement('br', {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 16
            }
        }));
    }))(pipelineGroups.applicationGroups));
};

exports.default = PipelineGroups;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXHBpcGVsaW5lR3JvdXBzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwibWFwIiwiY29tcG9zZSIsIkFwcGxpY2F0aW9uR3JvdXAiLCJQaXBlbGluZUdyb3VwcyIsInBpcGVsaW5lR3JvdXBzIiwiZGlzY292ZXJ5SWQiLCJhcHBsaWNhdGlvbkdyb3VwIiwiYXBwbGljYXRpb25JbnN0YW5jZSIsInVyaSIsImFwcGxpY2F0aW9uR3JvdXBzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBUyxBQUFLOztBQUNkLEFBQU87Ozs7Ozs7OztBQUVQLElBQU0saUJBQWlCLFNBQWpCLEFBQWlCLHFCQUFBO1FBQUEsQUFBRyxzQkFBSCxBQUFHO1FBQUgsQUFBbUIsbUJBQW5CLEFBQW1COzJCQUN0QyxjQUFBOztzQkFBQTt3QkFBQSxBQUNJO0FBREo7QUFBQSxLQUFBOztzQkFDSTt3QkFESixBQUNJLEFBQ0M7QUFERDtBQUFBLDRDQUVRLDRCQUFBOytCQUNBLGNBQUE7OzBCQUFBOzRCQUFBLEFBQ0k7QUFESjtBQUFBLFNBQUEsa0JBQ0ksQUFBQztpQkFDUSxpQkFBQSxBQUFpQixvQkFEMUIsQUFDOEMsQUFDMUM7OEJBRkosQUFFc0IsQUFDbEI7eUJBSEosQUFHaUI7OzBCQUhqQjs0QkFESixBQUNJLEFBS0E7QUFMQTtBQUNJOzswQkFJSjs0QkFQSixBQUNBLEFBTUk7QUFBQTtBQUFBO0FBUlgsQUFDRyxLQUFBLEdBVUYsZUFkYSxBQUNuQixBQUVLLEFBV2dCO0FBZHpCLEFBbUJBOztrQkFBQSxBQUFlIiwiZmlsZSI6InBpcGVsaW5lR3JvdXBzLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9tZmYvZGlzY292ZXJ5LXVpL3NyYyJ9