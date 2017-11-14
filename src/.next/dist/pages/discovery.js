'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('next\\node_modules\\babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next\\node_modules\\babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next\\node_modules\\babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next\\node_modules\\babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next\\node_modules\\babel-runtime/helpers/inherits');

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

var _jsxFileName = 'C:\\dev\\mff\\discovery-ui\\src\\pages\\discovery.js?entry';


var DiscoveryPage = function (_React$Component) {
    (0, _inherits3.default)(DiscoveryPage, _React$Component);

    function DiscoveryPage() {
        (0, _classCallCheck3.default)(this, DiscoveryPage);

        return (0, _possibleConstructorReturn3.default)(this, (DiscoveryPage.__proto__ || (0, _getPrototypeOf2.default)(DiscoveryPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(DiscoveryPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            var activeComponentUris = (0, _ramda.compose)((0, _ramda.map)(function (c) {
                return c.uri;
            }), (0, _ramda.filter)(function (c) {
                return c.isActive;
            }), _ramda.values, _ramda.mergeAll, _ramda.values)(this.props.components);

            if (activeComponentUris.length !== 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxkaXNjb3ZlcnkuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJ3aXRoUmVkdXgiLCJDYXJkIiwiQ2FyZFRpdGxlIiwiQ2FyZFRleHQiLCJDaXJjdWxhclByb2dyZXNzIiwiVGV4dEZpZWxkIiwidmFsdWVzIiwiY29tcG9zZSIsIm1hcCIsImZpbHRlciIsIm1lcmdlQWxsIiwiTGF5b3V0IiwiUGlwZWxpbmVHcm91cHMiLCJCdXR0b24iLCJpbml0U3RvcmUiLCJoYW5kbGVEaXNjb3ZlcnlTdGFydCIsInBlcnNpc3RTdGF0ZSIsImhhbmRsZURpc2NvdmVyeVN0YXJ0V2l0aElucHV0IiwiRGlzY292ZXJ5UGFnZSIsImFjdGl2ZUNvbXBvbmVudFVyaXMiLCJjIiwidXJpIiwiaXNBY3RpdmUiLCJwcm9wcyIsImNvbXBvbmVudHMiLCJsZW5ndGgiLCJpbnB1dFVyaSIsInRleHRBbGlnbiIsImRpc2NvdmVyeSIsInN0YXR1cyIsImlzRmluaXNoZWQiLCJwaXBlbGluZUNvdW50IiwicGVyc2lzdGVkIiwic3RhdGUiLCJpZCIsInBpcGVsaW5lR3JvdXBzIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVMsQUFBUSxBQUFTLEFBQUssQUFBUTs7QUFDdkMsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBUzs7QUFDVCxBQUFTLEFBQXNCLEFBQWM7Ozs7Ozs7SSxBQUd2Qzs7Ozs7Ozs7Ozs7NENBRWtCLEFBRWhCOztnQkFBTSwwREFDRSxhQUFBO3VCQUFLLEVBQUwsQUFBTztBQURhLEFBQ3hCLGFBQUEsQ0FEd0IscUJBRWpCLGFBQUE7dUJBQUssRUFBTCxBQUFPO0FBRlUsQUFFeEIsQUFDQSxBQUNBLEFBQ0EsYUFIQSxrREFJRixLQUFBLEFBQUssTUFOUCxBQUE0QixBQU1mLEFBRWI7O2dCQUFJLG9CQUFBLEFBQW9CLFdBQXhCLEFBQW1DLEdBQUcsQUFDbEM7cUJBQUEsQUFBSyxNQUFMLEFBQVcscUJBQVgsQUFBZ0MsQUFDbkM7QUFGRCxtQkFFTyxBQUNIO3FCQUFBLEFBQUssTUFBTCxBQUFXLDhCQUE4QixLQUFBLEFBQUssTUFBOUMsQUFBb0QsQUFDdkQ7QUFDSjs7OztpQ0FFUTt5QkFDTDs7bUNBQ0ksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsYUFBQSxrQkFDSSxBQUFDOzs4QkFBRDtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDO3VCQUFELEFBQ1UsQUFDTjswQkFGSixBQUVhOzs4QkFGYjtnQ0FESixBQUNJLEFBSUE7QUFKQTtBQUNJLGdDQUdKLEFBQUMsb0NBQVMsT0FBTyxFQUFDLFdBQWxCLEFBQWlCLEFBQVk7OEJBQTdCO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUVRO0FBRlI7QUFBQSxvQkFFUSxBQUFLLE1BQUwsQUFBVyxVQUFYLEFBQXFCLE9BQXJCLEFBQTRCLDZCQUMxQixjQUFBOzs4QkFBQTtnQ0FBQTtBQUFBO0FBQUEsYUFBQSxFQURGLEFBQ0UsMkJBQ0EsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGFBQUEsRUFFRSwwREFBQSxBQUFDLDRDQUFpQixLQUFsQixBQUFzQixZQUFXLElBQWpDLEFBQW9DOzhCQUFwQztnQ0FQaEIsQUFDSSxBQUlVLEFBRUUsQUFJWjtBQUpZO2tDQUlaLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQUNnQixvQkFBQSxBQUFLLE1BQUwsQUFBVyxVQUFYLEFBQXFCLE9BRHJDLEFBQzRDLGVBWmhELEFBV0ksQUFHQTs7OEJBQUE7Z0NBZEosQUFjSSxBQUNDO0FBREQ7QUFBQSxxQkFDQyxBQUFLLE1BQUwsQUFBVyxjQUFYLEFBQXlCLHdCQUN0QixBQUFDLGtDQUFPLFFBQVIsTUFBZSxTQUFmLE1BQXVCLE9BQXZCLEFBQTZCLGlCQUFnQixTQUFTLG1CQUFBOzJCQUFNLE9BQUEsQUFBSyxNQUFMLEFBQVcsYUFBYSxPQUFBLEFBQUssTUFBbkMsQUFBTSxBQUFtQztBQUEvRjs4QkFBQTtnQ0FESCxBQUNHO0FBQUE7YUFBQSxvQkFFQSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLEFBQUMsc0NBQVUseUNBQWdDLEtBQUEsQUFBSyxNQUFMLEFBQVcsVUFBdEQsQUFBZ0UsSUFBTSxVQUF0RTs4QkFBQTtnQ0F6QnBCLEFBQ0ksQUFLSSxBQWtCUSxBQUNJLEFBS2hCO0FBTGdCO21DQUtoQixBQUFDO2dDQUNtQixLQUFBLEFBQUssTUFBTCxBQUFXLFVBRC9CLEFBQ3lDLEFBQ3JDOzZCQUFhLEtBQUEsQUFBSyxNQUFMLEFBQVcsVUFGNUIsQUFFc0M7OzhCQUZ0QztnQ0EvQlIsQUFDSSxBQThCSSxBQU1YO0FBTlc7QUFDSTs7Ozs7RUFwRFEsZ0IsQUFBTTs7QUE0RGxDLGNBQUEsQUFBYyxZQUFkLEFBQTBCOztBQUcxQixJQUFNLGtCQUFrQixTQUFsQixBQUFrQix1QkFBQTs7b0JBQ1IsTUFEa0IsQUFDWixBQUNsQjttQkFBVyxNQUZtQixBQUViLEFBQ2pCO2tCQUFVLE1BSG9CLEFBR2QsQUFDaEI7ZUFKOEIsQUFJdkIsQUFDUDttQkFBVyxNQUxTLEFBQVUsQUFLYjtBQUxhLEFBQzlCO0FBREo7O0FBUUEsSUFBTSxxQkFBcUIsU0FBckIsQUFBcUIsNkJBQVksQUFDbkM7OzhCQUMwQiw4QkFBQSxBQUFDLHFCQUFEO21CQUF5QixTQUFTLG1DQUFsQyxBQUF5QixBQUFTLEFBQXFCO0FBRDFFLEFBRUg7c0JBQWMsc0JBQUEsQUFBQyxPQUFEO21CQUFXLFNBQVMsMkJBQXBCLEFBQVcsQUFBUyxBQUFhO0FBRjVDLEFBR0g7dUNBQStCLHVDQUFBLEFBQUMsVUFBRDttQkFBYyxTQUFTLDRDQUF2QixBQUFjLEFBQVMsQUFBOEI7QUFIeEYsQUFBTyxBQUtWO0FBTFUsQUFDSDtBQUZSLEFBUUE7O2tCQUFlLEFBQVUsMkRBQVYsQUFBcUIsaUJBQXJCLEFBQXNDLG9CQUFyRCxBQUFlLEFBQTBEIiwiZmlsZSI6ImRpc2NvdmVyeS5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiJDOi9kZXYvbWZmL2Rpc2NvdmVyeS11aS9zcmMifQ==