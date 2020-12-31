(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var formatError = function formatError(errorObj) {
    debugger;
    var col = errorObj.column || errorObj.columnNumber; // 兼容safari和firefox，谷歌没有列信息

    var row = errorObj.line || errorObj.lineNumber; // 兼容safari和firefox，谷歌没有行信息

    var errorType = errorObj.name;
    var message = errorObj.message;
    var stack = errorObj.stack; // chrome 没有行列信息

    if (stack) {
      // matchUrl 里面有报错url和报错的位置
      var matchUrl = stack.match(/https?:\/\/[^\n]+/); // 匹配栈顶的报错

      var urlFirstStack = matchUrl ? matchUrl[0] : ''; // "http://localhost:3003/js/main.js:31:5)"
      // 获取真正的url

      var resourceUrl = '';
      var regUrlCheck = /https?:\/\/(\S)*\.js/;

      if (regUrlCheck.test(urlFirstStack)) {
        resourceUrl = urlFirstStack.match(regUrlCheck)[0];
      } // 获取真正的行列信息


      var stackCol = null;
      var stackRow = null;
      var posStack = urlFirstStack.match(/:(\d+):(\d+)/); // "http://localhost:3003/js/main.js:31:5)"

      if (posStack && posStack.length >= 3) {
        var _posStack = _slicedToArray(posStack, 3);

        stackRow = _posStack[1];
        stackCol = _posStack[2];
      } //TODO formatStack


      return {
        content: stack,
        col: Number(stackCol || col),
        row: Number(stackRow || row),
        errorType: errorType,
        message: message,
        resourceUrl: resourceUrl
      };
    }
  };

  var errorCatch = {
    init: function init(cb) {
      var _origin_error = window.onerror;

      window.onerror = function (message, source, lineno, colno, error) {
        console.dir(error, 'error');
        debugger;

        try {
          var errorInfo = formatError(error); // 原生信息

          errorInfo._message = message;
          errorInfo._source = source;
          errorInfo._lineno = lineno;
          errorInfo._colno = colno;
          errorInfo.type = 'onerror';
          cb(errorInfo);
          _origin_error && _origin_error.apply(window, arguments);
        } catch (error) {
          console.log(error);
        }
      };
    }
  };

  // import perf from './perf'
  // new Image(`http://dasdasdad.gif?type=error&data=${xhrInfo}`)
  // perf.init((perfData) => {
  //     console.log('perf init')
  // })
  // resource.init((resourceData) => {
  //     console.log(resourceData, 'resourceData')
  // })
  // xhrHook.init((xhrData) => {
  //     console.log(xhrData, 'xhrData')
  // })

  errorCatch.init(function (errorData) {
    console.log(errorData, 'errorData');
  }); // behavior.init((behaviorData) => {
  //     console.log(behaviorData, 'behaviorData')
  // })
  // 打点，封装一个log函数一直往服务器传

})));
//# sourceMappingURL=bundle.umd.js.map
