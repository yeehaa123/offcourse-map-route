"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _offcourseMapPoint = require("offcourse-map-point");

var _offcourseMapPoint2 = _interopRequireDefault(_offcourseMapPoint);

var _pathsJsSemiRegularPolygon = require("paths-js/semi-regular-polygon");

var _pathsJsSemiRegularPolygon2 = _interopRequireDefault(_pathsJsSemiRegularPolygon);

var _classnames2 = require("classnames");

var _classnames3 = _interopRequireDefault(_classnames2);

var Stop = (function (_React$Component) {
  function Stop(props) {
    _classCallCheck(this, Stop);

    _get(Object.getPrototypeOf(Stop.prototype), "constructor", this).call(this, props);
    this.name = "stop";
  }

  _inherits(Stop, _React$Component);

  _createClass(Stop, [{
    key: "classes",
    value: function classes() {
      var _classnames;

      var _props = this.props;
      var complete = _props.complete;
      var highlight = _props.highlight;

      var highlightClass = this.name + "-is-highlight";
      var completeClass = this.name + "-is-complete";
      return (0, _classnames3["default"])((_classnames = {}, _defineProperty(_classnames, this.name, true), _defineProperty(_classnames, highlightClass, highlight), _defineProperty(_classnames, completeClass, complete), _classnames));
    }
  }, {
    key: "createShape",
    value: function createShape(x, y, radius, scale, collection) {
      var shape = (0, _pathsJsSemiRegularPolygon2["default"])({
        center: [x, y],
        radii: _ramda2["default"].times(function () {
          return radius * scale;
        }, collection.length)
      });
      var pointsData = _ramda2["default"].zip(collection, shape.path.points());
      return { shape: shape, pointsData: pointsData };
    }
  }, {
    key: "createPoint",
    value: function createPoint(_ref, strokeWidth, handlers) {
      var _ref2 = _slicedToArray(_ref, 2);

      var item = _ref2[0];
      var point = _ref2[1];
      var id = item.id;
      var highlight = item.highlight;
      var complete = item.complete;

      var _point = _slicedToArray(point, 2);

      var cx = _point[0];
      var cy = _point[1];

      var props = { strokeWidth: strokeWidth, id: id, highlight: highlight, complete: complete, cx: cx, cy: cy };
      return _react2["default"].createElement(_offcourseMapPoint2["default"], _extends({ key: item.id }, handlers, props));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _props2 = this.props;
      var x = _props2.x;
      var y = _props2.y;
      var radius = _props2.radius;
      var highlight = _props2.highlight;
      var handleHover = _props2.handleHover;
      var handleClick = _props2.handleClick;
      var collection = _props2.collection;

      var angle = 140;
      var scale = highlight ? 1.7 : 1;
      var strokeWidth = radius / 10 * scale;

      var _createShape = this.createShape(x, y, radius, scale, collection);

      var shape = _createShape.shape;
      var pointsData = _createShape.pointsData;

      var handlers = { handleHover: handleHover, handleClick: handleClick };
      var points = _ramda2["default"].map(function (data) {
        return _this.createPoint(data, strokeWidth, handlers);
      }, pointsData);

      return _react2["default"].createElement(
        "g",
        { transform: "rotate(" + angle + ", " + x + ", " + y + ")",
          onClick: handleClick.bind(this),
          onMouseEnter: handleHover.bind(this, true),
          onMouseLeave: handleHover.bind(this, false),
          className: this.classes() },
        _react2["default"].createElement("path", { strokeWidth: strokeWidth, d: shape.path.print() }),
        points
      );
    }
  }], [{
    key: "propTypes",
    value: {
      x: _react.PropTypes.number.isRequired,
      y: _react.PropTypes.number.isRequired,
      radius: _react.PropTypes.number.isRequired,
      highlight: _react.PropTypes.bool,
      collection: _react.PropTypes.array.isRequired,
      handleClick: _react.PropTypes.func.isRequired,
      handleHover: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }, {
    key: "defaultProps",
    value: {
      x: 50,
      y: 50,
      radius: 30,
      handleClick: function handleClick() {},
      handleHover: function handleHover() {}
    },
    enumerable: true
  }]);

  return Stop;
})(_react2["default"].Component);

exports["default"] = Stop;
module.exports = exports["default"];