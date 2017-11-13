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

var _jsxFileName = '/Users/jirihelmich/dev/mff/linkedpipes/discovery-ui/src/components/pipelineGroups.js';


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGlwZWxpbmVHcm91cHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJtYXAiLCJjb21wb3NlIiwiQXBwbGljYXRpb25Hcm91cCIsIlBpcGVsaW5lR3JvdXBzIiwicGlwZWxpbmVHcm91cHMiLCJkaXNjb3ZlcnlJZCIsImFwcGxpY2F0aW9uR3JvdXAiLCJhcHBsaWNhdGlvbkluc3RhbmNlIiwidXJpIiwiYXBwbGljYXRpb25Hcm91cHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFTLEFBQUs7O0FBQ2QsQUFBTzs7Ozs7Ozs7O0FBRVAsSUFBTSxpQkFBaUIsU0FBakIsQUFBaUIscUJBQUE7UUFBQSxBQUFHLHNCQUFILEFBQUc7UUFBSCxBQUFtQixtQkFBbkIsQUFBbUI7MkJBQ3RDLGNBQUE7O3NCQUFBO3dCQUFBLEFBQ0k7QUFESjtBQUFBLEtBQUE7O3NCQUNJO3dCQURKLEFBQ0ksQUFDQztBQUREO0FBQUEsNENBRVEsNEJBQUE7K0JBQ0EsY0FBQTs7MEJBQUE7NEJBQUEsQUFDSTtBQURKO0FBQUEsU0FBQSxrQkFDSSxBQUFDO2lCQUNRLGlCQUFBLEFBQWlCLG9CQUQxQixBQUM4QyxBQUMxQzs4QkFGSixBQUVzQixBQUNsQjt5QkFISixBQUdpQjs7MEJBSGpCOzRCQURKLEFBQ0ksQUFLQTtBQUxBO0FBQ0k7OzBCQUlKOzRCQVBKLEFBQ0EsQUFNSTtBQUFBO0FBQUE7QUFSWCxBQUNHLEtBQUEsR0FVRixlQWRhLEFBQ25CLEFBRUssQUFXZ0I7QUFkekIsQUFtQkE7O2tCQUFBLEFBQWUiLCJmaWxlIjoicGlwZWxpbmVHcm91cHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2ppcmloZWxtaWNoL2Rldi9tZmYvbGlua2VkcGlwZXMvZGlzY292ZXJ5LXVpL3NyYyJ9