var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Textfield Helpers
 * @module react/_textfieldHelpers
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textfieldWrapper = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var _reactAddonsShallowCompare = babelHelpers.interopRequireDefault(require("react-addons-shallow-compare"));

var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Textfield Wrapper
 * @function
 */
var textfieldWrapper = function textfieldWrapper(TextfieldComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    babelHelpers.inherits(_class, _React$Component);

    var _super = _createSuper(_class);

    function _class(props) {
      var _this;

      babelHelpers.classCallCheck(this, _class);
      _this = _super.call(this, props); // set initial state

      _this.state = {
        isEmpty: isEmpty('value' in props ? props.value : props.defaultValue),
        isTouched: false,
        isPristine: true
      }; // warn if value defined but onChange is not

      if ('value' in props && !props.onChange) {
        util.raiseError(_helpers.controlledMessage, true);
      } // callbacks


      var cb = util.callback;
      _this.onBlurCB = cb(babelHelpers.assertThisInitialized(_this), 'onBlur');
      _this.onChangeCB = cb(babelHelpers.assertThisInitialized(_this), 'onChange');
      _this.onLabelClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onLabelClick');
      return _this;
    }

    babelHelpers.createClass(_class, [{
      key: "onBlur",
      value: function onBlur(ev) {
        // ignore if event is a window blur
        if (document.activeElement !== this.controlEl) {
          this.setState({
            isTouched: true
          });
        } // execute callback


        var fn = this.props.onBlur;
        fn && fn(ev);
      }
    }, {
      key: "onChange",
      value: function onChange(ev) {
        this.setState({
          isEmpty: isEmpty(ev.target.value),
          isPristine: false
        }); // execute callback

        var fn = this.props.onChange;
        fn && fn(ev);
      }
    }, {
      key: "onLabelClick",
      value: function onLabelClick(ev) {
        // pointer-events shim
        if (util.supportsPointerEvents() === false) {
          ev.target.style.cursor = 'text';
          this.controlEl.focus();
        }
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
          this.setState({
            isEmpty: isEmpty(nextProps.value)
          });
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _reactAddonsShallowCompare.default)(this, nextProps, nextState);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        // disable MUI js
        this.controlEl._muiTextfield = true;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var wrapperCls = {},
            inputCls = {},
            labelEl;
        var _this$props = this.props,
            children = _this$props.children,
            className = _this$props.className,
            style = _this$props.style,
            hint = _this$props.hint,
            invalid = _this$props.invalid,
            label = _this$props.label,
            floatingLabel = _this$props.floatingLabel,
            other = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "style", "hint", "invalid", "label", "floatingLabel"]);
        var labelType = jqLite.type(label);

        if (labelType == 'string' && label.length || labelType == 'object') {
          labelEl = /*#__PURE__*/_react.default.createElement(Label, {
            text: label,
            onClick: this.onClickCB,
            htmlFor: this.props.id
          });
        }

        wrapperCls['mui-textfield'] = true;
        wrapperCls['mui-textfield--float-label'] = floatingLabel;
        wrapperCls = util.classNames(wrapperCls);
        inputCls['mui--is-touched'] = this.state.isTouched;
        inputCls['mui--is-untouched'] = !this.state.isTouched;
        inputCls['mui--is-pristine'] = this.state.isPristine;
        inputCls['mui--is-dirty'] = !this.state.isPristine;
        inputCls['mui--is-empty'] = this.state.isEmpty;
        inputCls['mui--is-not-empty'] = !this.state.isEmpty;
        inputCls['mui--is-invalid'] = invalid;
        inputCls = util.classNames(inputCls);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: wrapperCls + ' ' + className,
          style: style
        }, /*#__PURE__*/_react.default.createElement(TextfieldComponent, babelHelpers.extends({
          className: inputCls,
          inputRef: function inputRef(el) {
            _this2.controlEl = el;
          },
          placeholder: hint
        }, other, {
          onBlur: this.onBlurCB,
          onChange: this.onChangeCB
        })), labelEl);
      }
    }]);
    return _class;
  }(_react.default.Component), babelHelpers.defineProperty(_class, "defaultProps", {
    className: '',
    hint: null,
    invalid: false,
    label: null,
    floatingLabel: false
  }), _temp;
};
/**
 * Label constructor
 * @class
 */


exports.textfieldWrapper = textfieldWrapper;

var Label = /*#__PURE__*/function (_React$Component2) {
  babelHelpers.inherits(Label, _React$Component2);

  var _super2 = _createSuper(Label);

  function Label() {
    var _this3;

    babelHelpers.classCallCheck(this, Label);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this3 = _super2.call.apply(_super2, [this].concat(args));
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this3), "state", {
      style: {}
    });
    return _this3;
  }

  babelHelpers.createClass(Label, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      this.styleTimer = setTimeout(function () {
        var s = '.15s ease-out';
        var style;
        style = {
          transition: s,
          WebkitTransition: s,
          MozTransition: s,
          OTransition: s,
          msTransform: s
        };

        _this4.setState({
          style: style
        });
      }, 150);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // clear timer
      clearTimeout(this.styleTimer);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("label", {
        style: this.state.style,
        onClick: this.props.onClick,
        htmlFor: this.props.htmlFor,
        tabIndex: "-1" // firefox bugfix (see #252)

      }, this.props.text);
    }
  }]);
  return Label;
}(_react.default.Component);
/**
 * isEmpty helper
 * @function
 */


babelHelpers.defineProperty(Label, "defaultProps", {
  text: '',
  onClick: null
});

function isEmpty(value) {
  return value === undefined || value === null || value === '';
}
/** Define module API */