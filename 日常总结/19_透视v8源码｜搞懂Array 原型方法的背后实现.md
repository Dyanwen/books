# 透视v8源码｜搞懂Array 原型方法的背后实现
## map方法的底层实现
```js
function ArraySpeciesCreate(array, length) {
  length = INVERT_NEG_ZERO(length);
  var constructor = %ArraySpeciesConstructor(array);
  return new constructor(length);
}

function ArrayMap(f, receiver) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.map");

  // Pull out the length so that modifications to the length in the
  // loop will not affect the looping and side effects are visible.
  
  var array = TO_OBJECT(this);  // ecma 中提到的先转换为对象
  var length = TO_LENGTH(array.length);
  if (!IS_CALLABLE(f)) throw %make_type_error(kCalledNonCallable, f);
  var result = ArraySpeciesCreate(array, length);
  for (var i = 0; i < length; i++) {
    if (i in array) {
      var element = array[i];
      // 依次传入this, 当前项，当前索引，整个数组
      %CreateDataProperty(result, i, %_Call(f, receiver, element, i, array));
    }
  }
  return result;
}
```
其核心思想是在pop和push的基础上添加了一些判断，循环遍历实现`map`的思路，将处理过后的`%_Call(f, receiver, element, i, array)`赋值给新定义的数组`result`,最后返回这个新数组 `result`，并不改变原数组的值。
## push方法的底层实现
```js
function ArrayPush() {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.push");

  var array = TO_OBJECT(this);  // ecma 中提到的先转换为对象
  var n = TO_LENGTH(array.length);// 获取数组的长度
  var m = arguments.length;  // 获取添加的元素的长度

  // 判断是否超过JS能表示的最大正整数， kMaxSafeInteger = 2 ** 53 - 1
  if (m > kMaxSafeInteger - n) throw %make_type_error(kPushPastSafeLength, m, n);

  for (var i = 0; i < m; i++) {
    array[i+n] = arguments[i];
  }

  var new_length = n + m;
  array.length = new_length;
  return new_length;
}
```
其核心思路就在于给数组本身循环添加新的元素 `item`，然后调整数组的长度 `length` 为最新的长度
## pop方法的底层实现
```js
function ArrayPop() {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.pop");

  var array = TO_OBJECT(this);  // ecma 中提到的先转换为对象
  var n = TO_LENGTH(array.length);  // 获取数组的长度
  if (n == 0) {
    array.length = n;
    return;
  }

  n--;
  var value = array[n];
  %DeleteProperty_Strict(array, n); // 删除数组最后一个值
  array.length = n;
  return value;
}
```
其核心思路是在于删掉数组自身的最后一个元素，`index` 就是数组的 `len` 长度，然后更新最新的长度，最后返回的元素的值，即可达到想要的效果。另外就是在当长度为 0 的时候，如果执行 `pop` 操作，返回的是 `undefined`，需要做一下特殊处理。

以上只是个别方法的源码分析，如需要，可查看[MDN具体使用](https://github.com/v8/v8) 以及[v8源码](https://github.com/v8/v8)，配合[ECMA-262 规范文档](https://tc39.es/ecma262/#sec-array-objects)


### 参考地址

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
- https://github.com/v8/v8/blob/98d735069d0937f367852ed968a33210ceb527c2/src/js/array.js
- https://tc39.es/ecma262/#sec-array-objects