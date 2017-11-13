'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _Card = require('react-md/lib/Cards/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardTitle = require('react-md/lib/Cards/CardTitle');

var _CardTitle2 = _interopRequireDefault(_CardTitle);

var _CardText = require('react-md/lib/Cards/CardText');

var _CardText2 = _interopRequireDefault(_CardText);

var _CircularProgress = require('react-md/lib/Progress/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _TextFields = require('react-md/lib/TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _ramda = require('ramda');

var _layout = require('../components/layout');

var _layout2 = _interopRequireDefault(_layout);

var _pipelineGroups = require('../components/pipelineGroups');

var _pipelineGroups2 = _interopRequireDefault(_pipelineGroups);

var _Button = require('react-md/lib/Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _discoveryStore = require('../stores/discoveryStore');

var _actions = require('../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jirihelmich/dev/mff/linkedpipes/discovery-ui/src/pages/discovery.js?entry';


var DiscoveryPage = function (_React$Component) {
    (0, _inherits3.default)(DiscoveryPage, _React$Component);

    function DiscoveryPage() {
        (0, _classCallCheck3.default)(this, DiscoveryPage);

        return (0, _possibleConstructorReturn3.default)(this, (DiscoveryPage.__proto__ || (0, _getPrototypeOf2.default)(DiscoveryPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(DiscoveryPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            if (this.props.components.length === 0) {
                var activeComponentUris = (0, _ramda.compose)((0, _ramda.map)(function (c) {
                    return c.uri;
                }), (0, _ramda.filter)(function (c) {
                    return c.isActive;
                }), _ramda.values, _ramda.mergeAll, _ramda.values)(this.props.components);

                this.props.handleDiscoveryStart(activeComponentUris);
            } else {
                this.props.handleDiscoveryStartWithInput(this.props.inputUri);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(_layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 37
                }
            }, _react2.default.createElement(_Card2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                }
            }, _react2.default.createElement(_CardTitle2.default, {
                title: 'Discovery details',
                subtitle: 'Discovery is running. Results will be displayed on demand.',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 39
                }
            }), _react2.default.createElement(_CardText2.default, { style: { textAlign: 'center' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                }
            }, _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 44
                }
            }, this.props.discovery.status.isFinished ? _react2.default.createElement('span', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 47
                }
            }, 'Done!') : _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                }
            }, 'Waiting for the discovery to complete.', _react2.default.createElement(_CircularProgress2.default, { key: 'progress', id: 'discovery_progress', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                }
            }))), _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 54
                }
            }, 'Discovered ', this.props.discovery.status.pipelineCount, ' pipeline(s) in total.'), _react2.default.createElement('br', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }), this.props.persisted === false ? _react2.default.createElement(_Button2.default, { raised: true, primary: true, label: 'Persist state', onClick: function onClick() {
                    return _this2.props.persistState(_this2.props.state);
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }) : _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 61
                }
            }, _react2.default.createElement(_TextFields2.default, { value: 'http://localhost:9000/result/' + this.props.discovery.id, readonly: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 62
                }
            })))), _react2.default.createElement(_pipelineGroups2.default, {
                pipelineGroups: this.props.discovery.pipelineGroups,
                discoveryId: this.props.discovery.id,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }));
        }
    }]);

    return DiscoveryPage;
}(_react2.default.Component);

DiscoveryPage.propTypes = {};

var mapStateToProps = function mapStateToProps(state) {
    return {
        components: state.components,
        discovery: state.discovery,
        inputUri: state.inputUri,
        state: state,
        persisted: state.persisted
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        handleDiscoveryStart: function handleDiscoveryStart(activeComponentUris) {
            return dispatch((0, _actions.handleDiscoveryStart)(activeComponentUris));
        },
        persistState: function persistState(state) {
            return dispatch((0, _actions.persistState)(state));
        },
        handleDiscoveryStartWithInput: function handleDiscoveryStartWithInput(inputUri) {
            return dispatch((0, _actions.handleDiscoveryStartWithInput)(inputUri));
        }
    };
};

exports.default = (0, _nextReduxWrapper2.default)(_discoveryStore.initStore, mapStateToProps, mapDispatchToProps)(DiscoveryPage);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2Rpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIndpdGhSZWR1eCIsIkNhcmQiLCJDYXJkVGl0bGUiLCJDYXJkVGV4dCIsIkNpcmN1bGFyUHJvZ3Jlc3MiLCJUZXh0RmllbGQiLCJ2YWx1ZXMiLCJjb21wb3NlIiwibWFwIiwiZmlsdGVyIiwibWVyZ2VBbGwiLCJMYXlvdXQiLCJQaXBlbGluZUdyb3VwcyIsIkJ1dHRvbiIsImluaXRTdG9yZSIsImhhbmRsZURpc2NvdmVyeVN0YXJ0IiwicGVyc2lzdFN0YXRlIiwiaGFuZGxlRGlzY292ZXJ5U3RhcnRXaXRoSW5wdXQiLCJEaXNjb3ZlcnlQYWdlIiwicHJvcHMiLCJjb21wb25lbnRzIiwibGVuZ3RoIiwiYWN0aXZlQ29tcG9uZW50VXJpcyIsImMiLCJ1cmkiLCJpc0FjdGl2ZSIsImlucHV0VXJpIiwidGV4dEFsaWduIiwiZGlzY292ZXJ5Iiwic3RhdHVzIiwiaXNGaW5pc2hlZCIsInBpcGVsaW5lQ291bnQiLCJwZXJzaXN0ZWQiLCJzdGF0ZSIsImlkIiwicGlwZWxpbmVHcm91cHMiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBUyxBQUFRLEFBQVMsQUFBSyxBQUFROztBQUN2QyxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFTOztBQUNULEFBQVMsQUFBc0IsQUFBYzs7Ozs7OztJQUd2QyxBOzs7Ozs7Ozs7Ozs0Q0FFa0IsQUFFaEI7O2dCQUFJLEtBQUEsQUFBSyxNQUFMLEFBQVcsV0FBWCxBQUFzQixXQUExQixBQUFxQyxHQUFHLEFBQ3BDO29CQUFNLDBEQUNFLGFBQUE7MkJBQUssRUFBTCxBQUFPO0FBRGEsQUFDeEIsaUJBQUEsQ0FEd0IscUJBRWpCLGFBQUE7MkJBQUssRUFBTCxBQUFPO0FBRlUsQUFFeEIsQUFDQSxBQUNBLEFBQ0EsaUJBSEEsa0RBSUYsS0FBQSxBQUFLLE1BTlAsQUFBNEIsQUFNZixBQUViOztxQkFBQSxBQUFLLE1BQUwsQUFBVyxxQkFBWCxBQUFnQyxBQUNuQztBQVZELG1CQVVPLEFBQ0g7cUJBQUEsQUFBSyxNQUFMLEFBQVcsOEJBQThCLEtBQUEsQUFBSyxNQUE5QyxBQUFvRCxBQUN2RDtBQUNKOzs7O2lDQUVRO3lCQUNMOzttQ0FDSSxBQUFDOzs4QkFBRDtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLCtCQUNJLEFBQUM7dUJBQUQsQUFDVSxBQUNOOzBCQUZKLEFBRWE7OzhCQUZiO2dDQURKLEFBQ0ksQUFJQTtBQUpBO0FBQ0ksZ0NBR0osQUFBQyxvQ0FBUyxPQUFPLEVBQUMsV0FBbEIsQUFBaUIsQUFBWTs4QkFBN0I7Z0NBQUEsQUFDSTtBQURKOytCQUNJLGNBQUE7OzhCQUFBO2dDQUFBLEFBRVE7QUFGUjtBQUFBLG9CQUVRLEFBQUssTUFBTCxBQUFXLFVBQVgsQUFBcUIsT0FBckIsQUFBNEIsNkJBQzFCLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxhQUFBLEVBREYsQUFDRSwyQkFDQSxjQUFBOzs4QkFBQTtnQ0FBQTtBQUFBO0FBQUEsYUFBQSxFQUVFLDBEQUFBLEFBQUMsNENBQWlCLEtBQWxCLEFBQXNCLFlBQVcsSUFBakMsQUFBb0M7OEJBQXBDO2dDQVBoQixBQUNJLEFBSVUsQUFFRSxBQUlaO0FBSlk7a0NBSVosY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBQ2dCLG9CQUFBLEFBQUssTUFBTCxBQUFXLFVBQVgsQUFBcUIsT0FEckMsQUFDNEMsZUFaaEQsQUFXSSxBQUdBOzs4QkFBQTtnQ0FkSixBQWNJLEFBQ0M7QUFERDtBQUFBLHFCQUNDLEFBQUssTUFBTCxBQUFXLGNBQVgsQUFBeUIsd0JBQ3RCLEFBQUMsa0NBQU8sUUFBUixNQUFlLFNBQWYsTUFBdUIsT0FBdkIsQUFBNkIsaUJBQWdCLFNBQVMsbUJBQUE7MkJBQU0sT0FBQSxBQUFLLE1BQUwsQUFBVyxhQUFhLE9BQUEsQUFBSyxNQUFuQyxBQUFNLEFBQW1DO0FBQS9GOzhCQUFBO2dDQURILEFBQ0c7QUFBQTthQUFBLG9CQUVBLGNBQUE7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksQUFBQyxzQ0FBVSx5Q0FBZ0MsS0FBQSxBQUFLLE1BQUwsQUFBVyxVQUF0RCxBQUFnRSxJQUFNLFVBQXRFOzhCQUFBO2dDQXpCcEIsQUFDSSxBQUtJLEFBa0JRLEFBQ0ksQUFLaEI7QUFMZ0I7bUNBS2hCLEFBQUM7Z0NBQ21CLEtBQUEsQUFBSyxNQUFMLEFBQVcsVUFEL0IsQUFDeUMsQUFDckM7NkJBQWEsS0FBQSxBQUFLLE1BQUwsQUFBVyxVQUY1QixBQUVzQzs7OEJBRnRDO2dDQS9CUixBQUNJLEFBOEJJLEFBTVg7QUFOVztBQUNJOzs7OztFQXBEUSxnQkFBTSxBOztBQTREbEMsY0FBQSxBQUFjLFlBQWQsQUFBMEI7O0FBRzFCLElBQU0sa0JBQWtCLFNBQWxCLEFBQWtCLHVCQUFBOztvQkFDUixNQURrQixBQUNaLEFBQ2xCO21CQUFXLE1BRm1CLEFBRWIsQUFDakI7a0JBQVUsTUFIb0IsQUFHZCxBQUNoQjtlQUo4QixBQUl2QixBQUNQO21CQUFXLE1BTFMsQUFBVSxBQUtiO0FBTGEsQUFDOUI7QUFESjs7QUFRQSxJQUFNLHFCQUFxQixTQUFyQixBQUFxQiw2QkFBWSxBQUNuQzs7OEJBQzBCLDhCQUFBLEFBQUMscUJBQUQ7bUJBQXlCLFNBQVMsbUNBQWxDLEFBQXlCLEFBQVMsQUFBcUI7QUFEMUUsQUFFSDtzQkFBYyxzQkFBQSxBQUFDLE9BQUQ7bUJBQVcsU0FBUywyQkFBcEIsQUFBVyxBQUFTLEFBQWE7QUFGNUMsQUFHSDt1Q0FBK0IsdUNBQUEsQUFBQyxVQUFEO21CQUFjLFNBQVMsNENBQXZCLEFBQWMsQUFBUyxBQUE4QjtBQUh4RixBQUFPLEFBS1Y7QUFMVSxBQUNIO0FBRlIsQUFRQTs7a0JBQWUsQUFBVSwyREFBVixBQUFxQixpQkFBckIsQUFBc0Msb0JBQXJELEFBQWUsQUFBMEQiLCJmaWxlIjoiZGlzY292ZXJ5LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qaXJpaGVsbWljaC9kZXYvbWZmL2xpbmtlZHBpcGVzL2Rpc2NvdmVyeS11aS9zcmMifQ==