'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _navBar = require('../components/navBar');

var _navBar2 = _interopRequireDefault(_navBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jirihelmich/dev/mff/linkedpipes/discovery-ui/src/components/layout.js';

exports.default = function (_ref) {
    var children = _ref.children,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'Discovery UI' : _ref$title;
    return _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 6
        }
    }, _react2.default.createElement(_head2.default, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        }
    }, _react2.default.createElement('title', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 8
        }
    }, title), _react2.default.createElement('meta', { charSet: 'utf-8', __source: {
            fileName: _jsxFileName,
            lineNumber: 9
        }
    }), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width', __source: {
            fileName: _jsxFileName,
            lineNumber: 10
        }
    }), _react2.default.createElement('link', { rel: 'stylesheet', href: '/static/react-md.light_blue-amber.min.css', __source: {
            fileName: _jsxFileName,
            lineNumber: 11
        }
    }), _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', __source: {
            fileName: _jsxFileName,
            lineNumber: 12
        }
    }), _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons', __source: {
            fileName: _jsxFileName,
            lineNumber: 13
        }
    })), _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 15
        }
    }, _react2.default.createElement(_navBar2.default, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 16
        }
    }), _react2.default.createElement('div', { style: { width: '75%', margin: 'auto', paddingTop: '20px' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 17
        }
    }, children), _react2.default.createElement('footer', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 20
        }
    })));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiSGVhZCIsIk5hdkJhciIsImNoaWxkcmVuIiwidGl0bGUiLCJ3aWR0aCIsIm1hcmdpbiIsInBhZGRpbmdUb3AiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTyxBQUVQOzs7Ozs7OztrQkFBZSxnQkFBQTtRQUFBLEFBQUcsZ0JBQUgsQUFBRzswQkFBSCxBQUFhO1FBQWIsQUFBYSxtQ0FBYixBQUFxQixpQkFBckI7MkJBQ1gsY0FBQTs7c0JBQUE7d0JBQUEsQUFDSTtBQURKO0FBQUEsS0FBQSxrQkFDSSxBQUFDOztzQkFBRDt3QkFBQSxBQUNJO0FBREo7QUFBQSx1QkFDSSxjQUFBOztzQkFBQTt3QkFBQSxBQUFTO0FBQVQ7QUFBQSxPQURKLEFBQ0ksQUFDQSxnREFBTSxTQUFOLEFBQWM7c0JBQWQ7d0JBRkosQUFFSSxBQUNBO0FBREE7Z0RBQ00sTUFBTixBQUFXLFlBQVcsU0FBdEIsQUFBOEI7c0JBQTlCO3dCQUhKLEFBR0ksQUFDQTtBQURBO2dEQUNNLEtBQU4sQUFBVSxjQUFhLE1BQXZCLEFBQTRCO3NCQUE1Qjt3QkFKSixBQUlJLEFBQ0E7QUFEQTtnREFDTSxLQUFOLEFBQVUsY0FBYSxNQUF2QixBQUE0QjtzQkFBNUI7d0JBTEosQUFLSSxBQUNBO0FBREE7Z0RBQ00sS0FBTixBQUFVLGNBQWEsTUFBdkIsQUFBNEI7c0JBQTVCO3dCQVBSLEFBQ0ksQUFNSSxBQUVKO0FBRkk7eUJBRUosY0FBQTs7c0JBQUE7d0JBQUEsQUFDSTtBQURKO0FBQUEsdUJBQ0ksQUFBQzs7c0JBQUQ7d0JBREosQUFDSSxBQUNBO0FBREE7QUFBQSx3QkFDQSxjQUFBLFNBQUssT0FBTyxFQUFFLE9BQUYsQUFBUyxPQUFPLFFBQWhCLEFBQXdCLFFBQVEsWUFBNUMsQUFBWSxBQUE0QztzQkFBeEQ7d0JBQUEsQUFDTTtBQUROO09BRkosQUFFSSxBQUdBOztzQkFBQTt3QkFmRyxBQUNYLEFBU0ksQUFLSTtBQUFBO0FBQUE7QUFmWiIsImZpbGUiOiJsYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2ppcmloZWxtaWNoL2Rldi9tZmYvbGlua2VkcGlwZXMvZGlzY292ZXJ5LXVpL3NyYyJ9