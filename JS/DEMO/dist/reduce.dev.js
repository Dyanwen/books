"use strict";

// 1.经典累加器
var a1 = [1, 2, 3, 4, 5, 6];
var v1 = a1.reduce(function (preval, item, index, array) {
  return preval += item;
}, 4); // console.log(v1)
// 2.二位数组转一维

var a2 = [[1, 2], [3, 4, 5], [6, 7], [1, 2, 3]];
var v2 = a2.reduce(function (pre, item, index, array) {
  return pre.concat(item);
}, []); // console.log(v2)
//3.多维数组扁平化

var a3 = [[1, 2], [[3, 3, 3, 3], 4, 5], [[6, 6, 6, 6], 7], [1, 2, 3]];

var flatten = function flatten(arr) {
  return arr.reduce(function (pre, item, index, array) {
    return pre.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}; // console.log(flatten(a3))
// 4.数组分块


var arr4 = [1, 2, 3, 4, 5, 6];

var chunk = function chunk(arr, size) {
  return arr.reduce(function (res, cur) {
    return res[res.length - 1].length < size ? res[res.length - 1].push(cur) : res.push([cur]), res;
  }, [[]]);
}; // console.log(chunk(arr4, 3));
// 5. 字符统计


var countChar = function countChar(text) {
  text = text.split("");
  return text.reduce(function (record, c) {
    return record[c] = (record[c] || 0) + 1, record;
  }, {});
};

var text = "划水水摸鱼鱼";
console.log(countChar(text));