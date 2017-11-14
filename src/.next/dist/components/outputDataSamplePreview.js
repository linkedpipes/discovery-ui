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

var _reactMd = require('react-md');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\dev\\mff\\discovery-ui\\src\\components\\outputDataSamplePreview.js';


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
                width: 1000,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                }
            }, _react2.default.createElement('pre', { id: 'speed-boost-description', className: 'md-color--secondary-text', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 35
                }
            }, this.props.dataSample)));
        }
    }]);

    return OutputDataSamplePreview;
}(_react.PureComponent);

exports.default = OutputDataSamplePreview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXG91dHB1dERhdGFTYW1wbGVQcmV2aWV3LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIkJ1dHRvbiIsIkRpYWxvZ0NvbnRhaW5lciIsIk91dHB1dERhdGFTYW1wbGVQcmV2aWV3Iiwic3RhdGUiLCJ2aXNpYmxlIiwic2hvdyIsInNldFN0YXRlIiwiaGlkZSIsImFjdGlvbnMiLCJvbkNsaWNrIiwicHJpbWFyeSIsImNoaWxkcmVuIiwicHJvcHMiLCJkYXRhU2FtcGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQVE7Ozs7Ozs7SUFFSSxBOzs7Ozs7Ozs7Ozs7OztrUEFDakIsQSxRQUFRLEVBQUUsU0FBRixBQUFXLEEsZSxBQUVuQixPQUFPLFlBQU0sQUFDVDtrQkFBQSxBQUFLLFNBQVMsRUFBRSxTQUFoQixBQUFjLEFBQVcsQUFDNUI7QSxpQixBQUVELE9BQU8sWUFBTSxBQUNUO2tCQUFBLEFBQUssU0FBUyxFQUFFLFNBQWhCLEFBQWMsQUFBVyxBQUM1QjtBOzs7OztpQ0FFUTtnQkFBQSxBQUNHLFVBQVksS0FEZixBQUNvQixNQURwQixBQUNHLEFBQ1I7O2dCQUFNO3lCQUNPLEtBREksQUFDQyxBQUNkO3lCQUZhLEFBRUosQUFDVDswQkFISixBQUFnQixBQUFDLEFBR0gsQUFHZDtBQU5pQixBQUNiLGFBRFk7O21DQU9aLGNBQUE7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksQUFBQyxpQ0FBTyxRQUFSLE1BQWUsU0FBUyxLQUF4QixBQUE2Qjs4QkFBN0I7Z0NBQUE7QUFBQTtlQURKLEFBQ0ksQUFDQSxxQ0FBQSxBQUFDO29CQUFELEFBQ08sQUFDSDt5QkFGSixBQUVhLEFBQ1Q7dUJBSEosQUFHVSxBQUNOO3dCQUFRLEtBSlosQUFJaUIsQUFDYjt1QkFMSixBQU1JO3lCQU5KLEFBTWEsQUFDVDt1QkFQSixBQU9XOzs4QkFQWDtnQ0FBQSxBQVNJO0FBVEo7QUFDSSwrQkFRQSxjQUFBLFNBQUssSUFBTCxBQUFRLDJCQUEwQixXQUFsQyxBQUE0Qzs4QkFBNUM7Z0NBQUEsQUFDSztBQURMO29CQUNLLEFBQUssTUFidEIsQUFDSSxBQUVJLEFBU0ksQUFDZ0IsQUFLL0I7Ozs7O0FBckNnRCxBOztrQkFBaEMsQSIsImZpbGUiOiJvdXRwdXREYXRhU2FtcGxlUHJldmlldy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvbWZmL2Rpc2NvdmVyeS11aS9zcmMifQ==