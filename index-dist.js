'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _collapseWhiteSpace = require('collapse-white-space');

var _collapseWhiteSpace2 = _interopRequireDefault(_collapseWhiteSpace);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _reactToJsx = require('react-to-jsx');

var _reactToJsx2 = _interopRequireDefault(_reactToJsx);

var api = {
  toEqualJSX: function toEqualJSX(ReactElement) {
    return (0, _expect2['default'])((0, _reactToJsx2['default'])(this.actual)).toEqual((0, _reactToJsx2['default'])(ReactElement));
  },
  toNotEqualJSX: function toNotEqualJSX(ReactElement) {
    return (0, _expect2['default'])((0, _reactToJsx2['default'])(this.actual)).toNotEqual((0, _reactToJsx2['default'])(ReactElement));
  },
  toIncludeJSX: function toIncludeJSX(ReactElement) {
    return (0, _expect2['default'])((0, _collapseWhiteSpace2['default'])((0, _reactToJsx2['default'])(this.actual))).toInclude((0, _collapseWhiteSpace2['default'])((0, _reactToJsx2['default'])(ReactElement)));
  },
  toEqualShallowRendered: function toEqualShallowRendered(ReactElement) {
    var shallowRenderer = _reactAddonsTestUtils2['default'].createRenderer();
    shallowRenderer.render(this.actual);
    var actualOutput = shallowRenderer.getRenderOutput();
    shallowRenderer.render(ReactElement);
    var reactElementOutput = shallowRenderer.getRenderOutput();
    return (0, _expect2['default'])((0, _reactToJsx2['default'])(actualOutput)).toEqual((0, _reactToJsx2['default'])(reactElementOutput));
  },
  toNotEqualShallowRendered: function toNotEqualShallowRendered(ReactElement) {
    var shallowRenderer = _reactAddonsTestUtils2['default'].createRenderer();
    shallowRenderer.render(this.actual);
    var actualOutput = shallowRenderer.getRenderOutput();
    shallowRenderer.render(ReactElement);
    var reactElementOutput = shallowRenderer.getRenderOutput();
    return (0, _expect2['default'])((0, _reactToJsx2['default'])(actualOutput)).toNotEqual((0, _reactToJsx2['default'])(reactElementOutput));
  },
  toIncludeShallowRendered: function toIncludeShallowRendered(ReactElement) {
    var shallowRenderer = _reactAddonsTestUtils2['default'].createRenderer();
    shallowRenderer.render(this.actual);
    var actualOutput = shallowRenderer.getRenderOutput();
    shallowRenderer.render(ReactElement);
    var reactElementOutput = shallowRenderer.getRenderOutput();
    return (0, _expect2['default'])((0, _collapseWhiteSpace2['default'])((0, _reactToJsx2['default'])(actualOutput))).toInclude((0, _collapseWhiteSpace2['default'])((0, _reactToJsx2['default'])(reactElementOutput)));
  }
};

exports['default'] = api;
module.exports = exports['default'];
