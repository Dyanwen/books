"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var myEventEmitter =
/*#__PURE__*/
function () {
  function myEventEmitter() {
    _classCallCheck(this, myEventEmitter);

    this.eventMap = {};
  }

  _createClass(myEventEmitter, [{
    key: "on",
    value: function on(type, handler) {
      if (!(handler instanceof Function)) {
        throw new Error('请传入一个函数');
      }

      if (!this.eventMap[type]) {
        this.eventMap[type] = [];
      }

      this.eventMap[type].push(handler);
    }
  }, {
    key: "emit",
    value: function emit(type, params) {
      if (this.eventMap[type]) {
        this.eventMap[type].forEach(function (handler, index) {
          handler(params);
        });
      }
    }
  }, {
    key: "off",
    value: function off(type, handler) {
      if (this.eventMap[type]) {
        this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
      }
    }
  }]);

  return myEventEmitter;
}(); // 实例化 myEventEmitter


var myEvent = new myEventEmitter(); // 编写一个简单的 handler

var testHandler = function testHandler(params) {
  console.log("test\u4E8B\u4EF6\u88AB\u89E6\u53D1\u4E86\uFF0CtestHandler \u63A5\u6536\u5230\u7684\u5165\u53C2\u662F".concat(params));
}; // 监听 test 事件


myEvent.on("test", testHandler); // 在触发 test 事件的同时，传入希望 testHandler 感知的参数

myEvent.emit("test", "newState");