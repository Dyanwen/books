# 03 | 继承实现：探究 JS 常见的 6 种继承方式

## 第一种：原型链继承

```js
// 将子类构造函数的prototype指向父类构造函数的实例
function Parent1() {
  this.name = "parent1";
  this.play = [1, 2, 3];
}

function Child1() {
  this.type = "child2";
}
Child1.prototype = new Parent1();
console.log(new Child1());
```

**虽然可以访问父类的方法和属性,但是所有的子类实例都共享同一个原型对象**

-

## 第二种：构造函数继承（借助 call）

```js
function Parent1() {
  this.name = "parent1";
}

Parent1.prototype.getName = function () {
  return this.name;
};

function Child1() {
  Parent1.call(this);

  this.type = "child1";
}

let child = new Child1();

console.log(child); // 没问题

console.log(child.getName()); // 会报错
```

**虽然可以继承父类的实例属性和方法,但是不能继承父类的原型属性和方法.也就是说父类的引用属性不会被共享**

## 第三种：组合继承（前两种组合）

```js
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};

function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = "child3";
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play); // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'
```

**调用了两次 Parent3,增加了一次性能开销**

以上均为围绕构造函数的方式实现继承的.

## 第四种：原型式继承

```js
Object.create();
```

Object.create 方法是可以为一些对象实现浅拷贝的

原型式继承的区别很明显,也就是多个实例的引用类型属性指向相同的内存,存在篡改的可能

## 第五种：寄生式继承

```js
let parent5 = {
  name: "parent5",

  friends: ["p1", "p2", "p3"],

  getName: function () {
    return this.name;
  },
};

function clone(original) {
  let clone = Object.create(original);

  clone.getFriends = function () {
    return this.friends;
  };

  return clone;
}

let person5 = clone(parent5);

console.log(person5.getName());

console.log(person5.getFriends());
```

## 第六种：寄生组合式继承
> 减少了构造次数，减少了性能的开销

```js
function clone(parent, child) {
  // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程

  child.prototype = Object.create(parent.prototype);

  child.prototype.constructor = child;
}

function Parent6() {
  this.name = "parent6";

  this.play = [1, 2, 3];
}

Parent6.prototype.getName = function () {
  return this.name;
};

function Child6() {
  Parent6.call(this);

  this.friends = "child5";
}

clone(Parent6, Child6);

Child6.prototype.getFriends = function () {
  return this.friends;
};

let person6 = new Child6();

console.log(person6);

console.log(person6.getName());

console.log(person6.getFriends());
```

# 07 | 数组原理（上）：帮你梳理眼花缭乱的数组 API

## Array 的判断

```js
var a = [];
// 1.基于instanceof
a instanceof Array;
// 2.基于constructor
a.constructor === Array;
// 3.基于Object.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(a);
// 4.基于getPrototypeOf
Object.getPrototypeOf(a) === Array.prototype;
// 5.基于Object.prototype.toString
Object.prototype.toString.apply(a) === "[object Array]";
// 6.es6
Array.isArray(a);
```

## 改变自身的方法

> 基于 ES6 有 9 个,分别为`pop`、`push`、`reverse`、`shift`、`sort`、`splice`、`unshift`

> es6 新增的 2 个,分别为`copyWithin` 和 `fill`

## 不改变自身的方法

> 基于 ES7，不会改变自身的方法也有 9 个，分别为 `concat`、`join`、`slice`、`toString`、`toLocaleString`、`indexOf`、`lastIndexOf`、未形成标准的 `toSource`，

> 以及 ES7 新增的方法 `includes`

## 数组遍历的方法

> 基于 ES6，不会改变自身的遍历方法一共有 12 个，分别为 `forEach`、`every`、`some`、`filter`、`map`、`reduce`、`reduceRight`

> 以及 ES6 新增的方法 `entries`、`find`、`findIndex`、`keys`、`values`

> 注意点:
>
> - 所有插入元素的方法，比如 `push`、`unshift` 一律返回数组新的长度
> - 所有删除元素的方法，比如 `pop`、`shift`、`splice` 一律返回删除的元素，或者返回删除的多个元素组成的数组
> - 部分遍历方法，比如 `forEach`、`every`、`some`、`filter`、`map`、`find`、`findIndex`，它们都包含 _function(value,index,array){}_ 和 _thisArg_ 这样两个形参

# 08 | 数组原理（中）：如何理解 JS 的类数组？

> js 中包含的类数组对象
>
> - 函数里面的参数对象 `arguments`
> - 用 `getElementsByTagName/ClassName/Name` 获得的 `HTMLCollection`
> - 用 `querySelector` 获得的 `NodeList`

## 类数组转换成数组的方法

- `Array.from()`
- `[... arr]`

# 09 | 数组原理（下）：实现数组扁平化的 6 种方式

> 数组的扁平化其实就是将一个嵌套多层的数组 array（嵌套可以是任何层数）转换为只有一层的数组

## 方法一：普通的递归实

```js
let arr = [1, 2, [1, 2], [3, [4, 5, 6, [7, 8, 9], [9, 0, 1]]]];

function arrTon(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Object.prototype.toString.call(item) == "[object Array]") {
      //Array.isArray(item)
      arrTon(item);
    } else {
      result.push(item);
    }
  }
  return result;
}
arrTon(arr);
```

## 方法二：利用 reduce 函数迭代

```js
let arr = [1, 2, [1, 2], [3, [4, 5, 6, [7, 8, 9], [9, 0, 1]]]];
function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}
```

## 方法三：扩展运算符实现

```js
let arr = [1, 2, [1, 2], [3, [4, 5, 6, [7, 8, 9], [9, 0, 1]]]];
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
flatten(arr);
```

## 方法四：split 和 toString 共同处理

```js
let arr = [1, 2, [1, 2], [3, [4, 5, 6, [7, 8, 9], [9, 0, 1]]]];
let result = arr.toString().split(",");
```

## 方法五：调用 ES6 中的 flat

```js
let arr = [1, 2, [1, 2], [3, [4, 5, 6, [7, 8, 9], [9, 0, 1]]]];
let result = arr.flat(Infinity);
```

## 方法六：正则和 JSON 方法共同处理

```js
let arr = [1, 2, [1, 2], [3, [4, 5, 6, [7, 8, 9], [9, 0, 1]]]];
function flatten(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, "");
  str = "[" + str + "]";
  return JSON.parse(str);
}
flatten(arr);
```
