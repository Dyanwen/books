"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(Number.prototype, Symbol.iterator, {
  writable: true,
  configurable: true,
  enumerable: false,
  value: function iterator() {
    var _ref;

    var i,
        inc,
        done = false,
        top = +this; // 正向还是反向迭代？

    inc = 1 * (top < 0 ? -1 : 1);
    return _ref = {}, _defineProperty(_ref, Symbol.iterator, function () {
      return this;
    }), _defineProperty(_ref, "next", function next() {
      if (!done) {
        // 初始迭代总是0
        if (i == null) {
          i = 0;
        } // 正向迭代
        else if (top >= 0) {
            i = Math.min(top, i + inc);
          } // 反向迭代
          else {
              i = Math.max(top, i + inc);
            } // 本次迭代后结束？


        if (i == top) done = true;
        return {
          value: i,
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    }), _ref;
  }
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = (-3)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;
    console.log(i);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}