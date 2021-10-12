"use strict";

var _tasks;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// var Fib = {
//     [Symbol.iterator]() {
//         var n1 = 1, n2 = 1;
//         return {
//             [Symbol.iterator]() {
//                 return this
//             },
//             next() {
//                 var current = n2;
//                 n2 = n1;
//                 n1 = n2 + current;
//                 return {
//                     value: n1,
//                     done: false
//                 }
//             },
//             return(v) {
//                 console.log("Fibonacci sequence abandoned.")
//                 return { value: v, done: true };
//             }
//         }
//     }
// }
// for (const v of Fib) {
//     console.log(v);
//     if (v > 50) break
// }
var tasks = (_tasks = {}, _defineProperty(_tasks, Symbol.iterator, function () {
  var _ref;

  var steps = this.actions.slice();
  return _ref = {}, _defineProperty(_ref, Symbol.iterator, function () {
    return this;
  }), _defineProperty(_ref, "next", function next() {
    if (steps.length > 0) {
      var res = steps.shift().apply(void 0, arguments);
      return {
        value: res,
        done: false
      };
    } else {
      return {
        done: true
      };
    }
  }), _defineProperty(_ref, "return", function _return(v) {
    steps.length = 0;
    return {
      value: v,
      done: true
    };
  }), _ref;
}), _defineProperty(_tasks, "actions", []), _tasks);
tasks.actions.push(function step1(x) {
  console.log('step1', x);
  return x * 2;
}, function step2(x, y) {
  console.log('step2', x, y);
  return x + y * 2;
}, function step3(x, y, z) {
  console.log('step3', x, y, z);
  return x * y + z;
});
var it = tasks[Symbol.iterator]();
it.next(11);
it.next(22, 33);