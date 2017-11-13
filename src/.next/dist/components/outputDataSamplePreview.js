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

var _reactMd = require('react-md');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jirihelmich/dev/mff/linkedpipes/discovery-ui/src/components/outputDataSamplePreview.js';


var OutputDataSamplePreview = function (_PureComponent) {
    (0, _inherits3.default)(OutputDataSamplePreview, _PureComponent);

    function OutputDataSamplePreview() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, OutputDataSamplePreview);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OutputDataSamplePreview.__proto__ || (0, _getPrototypeOf2.default)(OutputDataSamplePreview)).call.apply(_ref, [this].concat(args))), _this), _this.state = { visible: false }, _this.show = function () {
            _this.setState({ visible: true });
        }, _this.hide = function () {
            _this.setState({ visible: false });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(OutputDataSamplePreview, [{
        key: 'render',
        value: function render() {
            var visible = this.state.visible;

            var actions = [{
                onClick: this.hide,
                primary: true,
                children: 'Close'
            }];

            return _react2.default.createElement('span', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 24
                }
            }, _react2.default.createElement(_reactMd.Button, { raised: true, onClick: this.show, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 25
                }
            }, 'Show Data Sample'), _react2.default.createElement(_reactMd.DialogContainer, {
                id: 'data-sample',
                visible: visible,
                title: 'Output data sample',
                onHide: this.hide,
                modal: true,
                actions: actions,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                }
            }, _react2.default.createElement('pre', { id: 'speed-boost-description', className: 'md-color--secondary-text', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 34
                }
            }, this.props.dataSample)));
        }
    }]);

    return OutputDataSamplePreview;
}(_react.PureComponent);

exports.default = OutputDataSamplePreview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvb3V0cHV0RGF0YVNhbXBsZVByZXZpZXcuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiQnV0dG9uIiwiRGlhbG9nQ29udGFpbmVyIiwiT3V0cHV0RGF0YVNhbXBsZVByZXZpZXciLCJzdGF0ZSIsInZpc2libGUiLCJzaG93Iiwic2V0U3RhdGUiLCJoaWRlIiwiYWN0aW9ucyIsIm9uQ2xpY2siLCJwcmltYXJ5IiwiY2hpbGRyZW4iLCJwcm9wcyIsImRhdGFTYW1wbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBUTs7Ozs7OztJQUVJLEE7Ozs7Ozs7Ozs7Ozs7O2tQQUNqQixBLFFBQVEsRUFBRSxTQUFGLEFBQVcsQSxlQUVuQixBLE9BQU8sWUFBTSxBQUNUO2tCQUFBLEFBQUssU0FBUyxFQUFFLFNBQWhCLEFBQWMsQUFBVyxBQUM1QjtBLGlCQUVELEEsT0FBTyxZQUFNLEFBQ1Q7a0JBQUEsQUFBSyxTQUFTLEVBQUUsU0FBaEIsQUFBYyxBQUFXLEFBQzVCO0E7Ozs7O2lDQUVRO2dCQUFBLEFBQ0csVUFBWSxLQURmLEFBQ29CLE1BRHBCLEFBQ0csQUFDUjs7Z0JBQU07eUJBQ08sS0FESSxBQUNDLEFBQ2Q7eUJBRmEsQUFFSixBQUNUOzBCQUhKLEFBQWdCLEFBQUMsQUFHSCxBQUdkO0FBTmlCLEFBQ2IsYUFEWTs7bUNBT1osY0FBQTs7OEJBQUE7Z0NBQUEsQUFDSTtBQURKO0FBQUEsYUFBQSxrQkFDSSxBQUFDLGlDQUFPLFFBQVIsTUFBZSxTQUFTLEtBQXhCLEFBQTZCOzhCQUE3QjtnQ0FBQTtBQUFBO2VBREosQUFDSSxBQUNBLHFDQUFBLEFBQUM7b0JBQUQsQUFDTyxBQUNIO3lCQUZKLEFBRWEsQUFDVDt1QkFISixBQUdVLEFBQ047d0JBQVEsS0FKWixBQUlpQixBQUNiO3VCQUxKLEFBTUk7eUJBTkosQUFNYTs7OEJBTmI7Z0NBQUEsQUFRSTtBQVJKO0FBQ0ksK0JBT0EsY0FBQSxTQUFLLElBQUwsQUFBUSwyQkFBMEIsV0FBbEMsQUFBNEM7OEJBQTVDO2dDQUFBLEFBQ0s7QUFETDtvQkFDSyxBQUFLLE1BWnRCLEFBQ0ksQUFFSSxBQVFJLEFBQ2dCLEFBSy9COzs7OztBQXBDZ0QsQTs7a0JBQWhDLEEiLCJmaWxlIjoib3V0cHV0RGF0YVNhbXBsZVByZXZpZXcuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2ppcmloZWxtaWNoL2Rldi9tZmYvbGlua2VkcGlwZXMvZGlzY292ZXJ5LXVpL3NyYyJ9