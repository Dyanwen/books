## 什么是 TS

- ts 是静态类型，在编译阶段就能确定每个变量的类型
- ts 是弱类型，支持隐式类型转换
- ts 完全兼容 js，不会修改 js 运行时的一些特性
- ts 可以编译为 js，然后运行在浏览器，nodejs 等任何可以运行 js 的地方
- ts 拥有多种编译选项，类型检查的严格程度完全由自己掌控
- ts 和 js 可以共存，这意味着 js 项目可以渐进式迁移到 ts
- ts 增强了编辑器的功能，提供了代码补全，接口提示，跳转到定义，代码重构等能力
- ts 拥有活跃的社区，大多数常用的第三方库都提供了类型声明
- ts 与标准同步，符合最新的 ECMAScript 标准

## hello ts

TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错

```ts
function sayHello(person: string) {
  return `hi,${person}`;
}

let user = "lisa";
console.log(sayHello(user));
```

# 基础

## 原始数据类型

- 原始数据类型:`bool`,`string`,`number`,`null`,`undefined`,`symbol`,`bigInt`

### 布尔

```
let bool:boolean = false;//编译通过
```

> 注意，使用构造函数 Boolean 创造的对象不是布尔值：

> 事实上 new Boolean() 返回的是一个 Boolean 对象：

```ts
let createdByNewBoolean: Boolean = new Boolean(1);
```

> 直接调用 Boolean 也可以返回一个 boolean 类型：

```ts
let createdByBoolean: boolean = Boolean(1);
```

### 数值

- 使用 number 定义数值类型：其中二进制和八进制，NaN，Infinity 都属于 number 类型

### 空值

声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：

```ts
let unusable: void = undefined;
```

### Null 和 Undefined

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

```ts
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;
```

而 void 类型的变量不能赋值给 number 类型的变量：

```ts
let u: void;
let num: number = u;
```

## 任意值

- any 类型，则允许被赋值为任意类型
- 在任意值上访问任何属性都是允许的：
- 如果变量在声明的时候，未指定其类型，那么它会被识别为任意值类型：也就是说会被推断为 any 类型

```ts
let a1; // let a1 : any;
a1.setName("Jerry");
a1 = 3;
a1 = "name";
```

## 类型推论

ts 会在没有明确的指定类型的时候，推断出一个类型，这就是类型推论

```ts
let a2 = "lila";
a2 = 4; //error
```

## 联合类型

联合类型表示可以为多种类型中的一种，类型之间用｜分割，

当访问联合类型的属性或方法的时候，如果不确定变量的类型到底是那个，那么访问的就是联合类型的共有属性，如果其中一个没有，则会报错

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

```ts
let a3: string | number;
a3 = "seven";
console.log(a3.length); // 5
a3 = 7;
console.log(a3.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

## 对象的类型——接口

在 ts 中，我们用接口定义对象的类型

定义的变量比接口少一些属性是不允许的，多一些属性也不是不被允许的
但是我们可以定义可选属性

```ts
interface person {
  name: string;
  age: number;
  sex?: string;
}
let tom: person = {
  name: "zhangsan",
  age: 23,
};
```

如果想要一个接口有任意的属性，那么我们可以使用如下方法

```ts
interface Person {
  name: string;
  sex: string;
  [propName: string]: any;
}
```

如果一些字段只能在创建的时候被赋值，那么我们可以使用`readonly`

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
```

## 数组的类型

- [类型+方括号]表示

```ts
let arr: number[] = [1, 2, 3, 4];
```

- 数组泛型`Array<elemType>`

```ts
let arr: Array<number> = [1, 2, 3, 4, 5];
```

- 用接口表示数组

```ts
interface NumberArray {
  [index: number]: number;
}
let arr: NumberArray = [1, 2, 3, 4];
```

- 类数组不能用普通的数组方式来描述

```ts
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
function sum() {
  let args: IArguments = arguments;
}
```

- any 在数组中的应用

```ts
let list: any[] = ["xcatliu", 25, { website: "http://xcatliu.com" }];
```

## 函数的类型

- 函数声明:输入多余或者少于定义的参数都是不被允许的

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

- 函数表达式

```ts
let mySum = function (x: number, y: number): number {
  return x + y;
};
let mySum: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
interface SearchFunc {
  (x: number, y: number): number;
}
let mySum: SearchFunc = function (x: number, y: number): number {
  return x + y;
};
```

可选参数只能出现在函数参数中的最后面，也就是说可选参数后面不能出现必选参数

- 重载：允许一个函数接受不同数量或者类型的参数事，作出不同的处理

```ts
function reverse(x: number): number;
function reverse(x: string): string;

function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

## 类型断言

手动指定一个值的类型，直接使用`as`

### 总结

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 any
- any 可以被断言为任何类型
- 要使得 A 能够被断言为 B，只需要 A 兼容 B 或者 B 兼容 A 即可

### 双重断言:不到万不得已千万不要使用

```ts
interface Cat {
  run(): void;
}
interface Fish {
  swim(): void;
}
function testCat(cat: Cat) {
  return (cat as any) as Fish;
}
```

### 类型断言 VS 类型转换

类型断言只会影响 ts 编译时的类型，类型断言语句在编译结果中会被删除：

```ts
function toBoolean(something: any): boolean {
  return something as boolean;
}

toBoolean(1); //1

//编译之后
function toBoolean(something) {
  return something;
}

toBoolean(1);
// 返回值为 1
```

// 所以类型断言不是类型转换，他不会真的影响到变量的类型
// 若要进行类型转换，需要直接嗲用类型转换的方法

```ts
function toBoolean(something: any): boolean {
  return Boolean(something);
}
toBoolean(1);
// true
```

### 类型断言 vs 类型声明

```ts
// 类型断言
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}
const animal: Animal = {
  name: "tom",
};
let tom = animal as Cat;
```

```ts
//类型声明
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}
const animal: Animal = {
  name: "tom",
};
let tom: Cat = animal; //这里会报错，这是因为不能将父类的实例赋值给类型为子类的变量
```

核心区别在于：

- animal 断言为 cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
- animal 赋值给 tom，需要满足 Cat 兼容 Animal 才能
  但是在这里 Cat 并不兼容 Animal

### 类型断言 vs 范型

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom = getCacheData("tom") as Cat;
tom.run();

function getCacheData<T>(key: string): T {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}
const tom = getCacheData<Cat>("tom");
tom.run();
```

## 类型别名

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(v: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
```

## 字符串字面量类型

> 字符串字面量类型用来约束取值只能是某几个字符串中的一个

```ts
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {
  // do something
}
handleEvent(document.getElementById("hello"), "scroll");
handleEvent(document.getElementById("hello"), "dbclick"); //报错
```

## 元组

数组合并了相同类型的对象，而元组合并了不同类型的对象
当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
当添加越界元素的时候，它的类型会被限制为元组中每个类型的联合类型

## 枚举

枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```
enum Days{
    Sun,Mon,Tue,Wed,Thu,Fri,Sat
}
```

枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射

事实上上面的枚举会被编译成

```ts
var Days;
(function (Days) {
  Days[(Days["Sum"] = 0)] = Days["Sum"];
  Days[(Days["Mon"] = 0)] = Days["Mon"];
  Days[(Days["Tue"] = 0)] = Days["Tue"];
  Days[(Days["Wed"] = 0)] = Days["Wed"];
  Days[(Days["Thu"] = 0)] = Days["Thu"];
  Days[(Days["Fri"] = 0)] = Days["Fri"];
  Days[(Days["Sat"] = 0)] = Days["Sat"];
})(Days || (Days = {}));
```

也可以手动赋值

```ts
enum Days {
  Sum = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
console.log(Days["Sum"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
```

上面的栗子中，未手动赋值的枚举会接着上一个枚举项递增，如果未手动赋值的枚举项和手动赋值的重复了，那么 ts 是不会察觉到这一点的，后面的则会覆盖前面的

枚举成员被当作是常数的情况：

- 不具有初始化函数并且之前的枚举成员是常数，在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1.但第一个枚举元素是个例外，如果它没有初始化方法，那么他的初始值为 0
- 枚举成员使用常数枚举表达式初始化，常数枚举表达式是 ts 表达式的子集，它可以在编译阶段求值，当一个表达式满足下面条件之一时，他就是一个常数枚举表达式：
  - 数字字面量
  - 引用之前定义的常量枚举成员，如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  - 带括号的常数枚举表达式
  - +，-，～一元运算符应用于常数枚举表达式
  - +，-，/，%，，<<,>>,<<<,>>>,&,|,^二元运算符，常数枚举表达式作为其一个操作对象，若常数枚举表达式求值后为 NaN,或者 Infinity，则会在编译阶段报错

### 常数枚举

常数枚举是使用 const enum 定义的枚举类型
常数枚举与普通枚举的区别是，他会在编译阶段被删除，并且不能包含计算成员


## 泛型
泛型是指在定义函数，接口或者类的时候，不预先指定具体的类型，而在使用的时候在指定类型的一种特性

```ts
function createArray(length: number, value: any): Array<any>{
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x');

// 使用泛型

function createArray<T>(length: number, value: T): Array<T>{
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x');
```
### 多个类型参数
定义泛型的时候，可以一次定义多个类型参数

```ts
function swap<T, U>(tuple: [T, U]): [U, T]{
    return [tuple[1],tuple[0]]
}

swap([7, 'seven']); // ['seven', 7]
```
### 泛型约束
在函数内部使用泛型变量的时候，由于事先不知道他是哪种类型，所以不能随意的操作他的属性或者方法，对于这种，我们可以对泛型添加约束，只允许这个函数传入那些包含了指定属性的变量，这就是泛型约束
```ts
interface Lengthwise{
    length: number;
}
function loggingIdentity<T extends Lengthwise>(args:T):T {
    console.log(args.length);
    return args;
}
```
## 代码检查
```bash
npm install --save-dev eslint
```
由于 ESLint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装 @typescript-eslint/parser，替代掉默认的解析器，别忘了同时安装 typescript：
```bash
npm install --save-dev typescript @typescript-eslint/parser
```
接下来需要安装对应的插件 @typescript-eslint/eslint-plugin 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。
```bash
npm install --save-dev @typescript-eslint/eslint-plugin
```
### 创建配置文件
ESLint 需要一个配置文件来决定对哪些规则进行检查，配置文件的名称一般是 .eslintrc.js 或 .eslintrc.json

当运行ESLint检查一个文件的时候，它会首先尝试读取该文件目录下的配置文件，然后在一级一级的网上查找，将所找到的配置合并起来，作为当前被检查文件的配置

在项目的根目录下创建`.eslintrc.js`,内容如下
```js
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        // 禁止使用 var
        'no-var': "error",
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ]
    }
}
```

### 检查整个项目的 ts 文件
```json
{
    "scripts": {
        "eslint": "eslint src --ext .ts"
    }
}
```