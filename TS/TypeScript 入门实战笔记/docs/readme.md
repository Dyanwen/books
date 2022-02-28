## 01 | 如何快速搭建 TypeScript 学习开发环境？

> 不必等到转译阶段即可直接运行和调试运用,且编码时能快速检测,抛出类型错误
> vscode 默认使用自身内置的 TypeScript 语言服务版本(应用路径下 node——modules/typescript 里的 TypeScript 版本)

## 02 | 简单基础类型：TypeScript 与 JavaScript 有何不同？

TypeScript 其实就是类型化的 JavaScript,不仅支持 JavaScript 的所有特性,还在 JavaScript 的基础上添加了静态类型注解扩展

TypeScript 是 JavaScript 的超集

- TypeScript 可以轻易复用 js 的代码.以及最新特性
- TypeScript 使用可选的静态类型进行检查报错

在 TypeScript 语法中,类型的标注主要通过类型后置语法来实现

```js
let num = 1;
```

ts 与 js 的区别

- 可以在 ts 中显式声明变量 num 仅仅是数字类型,只需要在变量 num 后添加:number 类型注解即可

```ts
let num: number = 1;
```

原始类型:`string`,`number`,`boolean`,`undefined`,`symbol`,`bigint`
`null`是一个伪原始类型

> 通过 ts 与 js 的对比,我们发现 ts 时添加了类型注解的 js

## 03 | 复杂基础类型：TypeScript 与 JavaScript 有何不同？

ts 中的数组和元组都会转换成 js 中的数组
数组可以使用下面两种方式

```ts
let a: number[] = [1, 2, 3, 4]; //推荐
let b: Arrat<number> = [1, 2, 3, 4];
```

元组类型:

- 特性:可以限制数组元素的个数和类型,他特别适合用来实现多值返回

  > 数组类型的值只有显示添加了元组类型注解后（或者使用 as const，声明为只读元组），TypeScript 才会把它当作元组，否则推荐出来的类型就是普通的数组类型（第 4 讲会介绍类型推断）。

特殊类型:

- any:指的是一个任意类型,它是官方提供的一个选择性绕过静态类型检测的作弊方式
  - 可以对被注解为 any 的变量进行任何操作(获取事实上并不存在的属性,方法)
  - TS 无法检测其属性是否存在,类型是否正确
  - any 类型会在对象调用链中进行传导,即所有 any 类型的任意属性的类型都是 any
- unknown 是 ts3.0 中增加的一个类型,它主要用来描述类型并不确定的变量
  - 可以将任意类型的值复制给 unknown,但是 unknown 类型的值只能复制给 unknown 或者 any
  - 如果不缩小类型,对 unknown 执行的任何操作都会出现如下所示错误
- void 类型,仅适用于标识没有返回值的函数,即如果该函数没有返回值(鸡肋)
- undefined 的最大价值主要体现在接口类型上,他表示一个可缺省,未定义的属性(鸡肋)

  - 可以把 undefined 值或类型是 undefined 的变量赋值给 void 类型变量,反过来,类型是 void 但是值时 undefined 的变量不能复制给 undefined 类型

  ```ts
  const userInfo: {
    id?: number;
  } = {};
  let undeclared: undefined = undefined;
  let unusable: void = undefined;

  unusable = undeclared; //ok
  undeclared = unusable; // ts(2322)
  ```

- null 的价值主要体现在接口制定上,它表明对象或属性可能是空置(鸡肋)

undefined 和 null 类型具备警示意义:可以提醒我们针对可能操作这两种类型的值的情况做容错处理

```ts
const userInfo: {
  id?: number;
  name?: null | string;
} = { id: 1, name: "Captain" };
if (userInfo.id !== undefined) {
  // Type Guard
  userInfo.id.toFixed(); // id 的类型缩小成 number
}
userInfo.id!.toFixed(); // ok，但不建议
userInfo.name!.toLowerCase(); // ok，但不建议

userInfo.id?.toFixed(); // Optional Chain
const myName = userInfo.name ?? `my name is ${info.name}`; // 空值合并
```

- never 标识永远不会发生值的类型,是所有类型的字类型,他可以给所有类型复制
- object 类型表示非原始类型的类型,即非 number,string,boolean,bigint,symbol,null.undefined 的类型

## 04 | 什么是字面量类型、类型推断、类型拓宽和类型缩小？

字面量类型:数字字面量类型,布尔字面量类型,字符串字面量类型

- 使用字面量联合类型描述一个明确,可`up`可`down`的集合

```ts
type Direction = "top" | "down";
function move(dir: Direction) {}
move("top"); //ok
move("right"); //ts(2345 )
```

通过字面量类型组合的联合类型可以限制函数的参数为指定的字面量类型集合
编译器会检查参数是否是指定的字面量类型集合里的成员

使用字面量类型(组合的联合类型)可以将函数的参数限定为更具体的类型

## 05 | 函数类型：返回值类型和参数类型到底如何定义？

函数是构建应用的一块基石
我们可以使用函数抽离可复用的逻辑,抽象模型,封装过程

- ts 函数类型中`=>`用来表示函数的定义
  (其左侧是函数的参数类型,右侧是函数的返回值类型)

- ES6 中的`=>`是函数的实现

  ```ts
  type Adder = (a: number, b: number) => number; //ts函数类型定义
  const add: Adder = (a, b) => a + b; //ES6箭头函数
  ```

  - 可以使用类似对象属性的简写语法来声明函数类型的属性

  ```ts
  interface Entity {
    add: (a: number, b: number) => number;
    del(a: number, b: number): number;
  }
  const entity: Entity = {
    add: (a, b) => a + b,
    del(a, b) {
      return a - b;
    },
  };
  ```

  函数返回值的类型推断结合泛型可以实现特别复杂的类型计算

## 06 | 类类型：如何高效使用类型化的面向对象编程利器？

- public:修饰的是在任何地方可见,共有的属性或者方法
- private 修饰的是仅在同一类中可见,私有的属性或者方法
- protected 修饰的是仅在类自身及其子类中可见,受保护的属性或者方法
- readonly 只读修饰符声明类的属性,只读修饰符需要放在可见修饰符的后面
- set 和 get 只能放在类中
- staic 静态属性,只能通过类访问

除了 static 之外的所有属性都是类在实例话时才会被初始化

> 注意:不依赖实例 this 上下文的方法就可以定义成静态方法,这就意味着显示注解 this 类型才可以在静态方法中使用 this,非静态方法不需要显式注解 this 类型

ts 中定义类的私有属性仅仅代表静态类型检测层面的私有
如果我们强制忽略 ts 类型的检查错误
转译且运行 js 时依旧可以获取到 private 属性
这是因为 js 并不支持真正意义上的私有属性

抽象类:可以使用抽象类定义派生类需要实现的属性和方法,同时可以定义其他被继承的默认属性和方法

```ts
abstract class Adder {
  abstract x: number;
  abstract y: number;
  abstract add(): number;
  displayName = "Adder";
  addTwice(): number {
    return (this.x + this.y) * 2;
  }
}
class NumAdder extends Adder {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
  add(): number {
    return this.x + this.y;
  }
}
const numAdder = new NumAdder(1, 2);
console.log(numAdder.displayName); // => "Adder"
console.log(numAdder.add()); // => 3
console.log(numAdder.addTwice()); // => 6
```

使用接口与抽象类相比,区别在于接口只能定义类成员的类型

```ts
interface IAdder {
  x: number;
  y: number;
  add: () => number;
}
class NumberAdder implements IAdder {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.t = y;
  }
  add() {
    return this.x + this.y;
  }
  addTwice() {
    return (this.x + this.y) * 2;
  }
}
```

在定义类的时候,我们声明的除构造函数外所有属性,方法的类型就是这个特殊类型的成员

```ts
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const a1: A = {}; // ts(2741) Property 'name' is missing in type '{}' but required in type 'A'.
const a2: A = { name: "a2" }; // ok
```

public 哪都能用，private 只有基类可以用，protected 基类和派生类中可以用

## 07 | 接口类型与类型别名：这两者的用法与区别分别是什么？

接口类型与类型别名让 ts 具备了 js 所缺少的,描述较为复杂数据结构的能力

interface 接口类型
通过接口类型,可以清晰地定义模块内,跨模块,跨项目代码的通信规则

ts 对对象的类型检测遵循一种被称为“鸭子类型”或者“结构化类型”的准则,即只要两个对象的结构一致,属性和方法的类型一致,则他们的类型就是一致的

```ts
function Study(language: { name: string; age: () => number }) {
  console.log(
    `ProgramLanguage ${language.name} created ${language.age()} years ago.`
  );
}
Study({
  name: "TypeScript",
  age: () => new Date().getFullYear() - 2012,
});

/** ts(2345) 实参(Argument)与形参(Parameter)类型不兼容，不存在的属性 id */
Study({
  id: 2,
  name: "TypeScript",
  age: () => new Date().getFullYear() - 2012,
});

//如果我们先把这个对象字面量赋值给一个变量，然后再把变量传递给函数进行调用，那么 TypeScript 静态类型检测就会仅仅检测形参类型中定义过的属性类型，而包容地忽略任何多余的属性，此时也不会抛出一个 ts(2345) 类型错误
let ts = {
  id: 2,
  name: "TypeScript",
  age: () => new Date().getFullYear() - 2012,
};
Study(ts); // ok
```

```ts
/** 纯 JavaScript 解构语法 */
function StudyJavaScript({ name, age }) {
  console.log(name, age);
}
/** TypeScript 里解构与内联类型混用 */
function StudyTypeScript({ name, age }: { name: string; age: () => number }) {
  console.log(name, age);
}
/** 纯 JavaScript 解构语法，定义别名 */
function StudyJavaScript({ name: aliasName }) {
  // 定义name的别名
  console.log(aliasName);
}
/** TypeScript */
function StudyTypeScript(language: { name: string }) {
  // console.log(name); // 不能直接打印name
  console.log(language.name);
}
```

从上面我们可以看出,在函数中,对象解构和定义类型的语法很类似,实际上,定义内联的接口类型是不可复用的,所以我们应该更多的使用`interface`关键字来抽离可服用的接口类型

可缺省意味着可以不设置属性键名,类型是 undefined 意味着属性键名不可缺省

```ts
interface ReadOnlyProgramLanguage {
  /** 语言名称 */
  readonly name: string;
  /** 使用年限 */
  readonly age: (() => number) | undefined;
}

let ReadOnlyTypeScript: ReadOnlyProgramLanguage = {
  name: "TypeScript",
  age: undefined,
};
/** ts(2540)错误，name 只读 */
ReadOnlyTypeScript.name = "JavaScript";
```

需要注意的是,这仅仅是静态类型检测层面的只读,实际上并不能阻止对对象的篡改,因为在转译为 js 之后,readonly 修饰符会被抹掉,因此,任何时候与其直接修改一个对象,不如返回一个新的对象

### 定义函数类型

- 接口类型不仅可以定义对象的类型,还可以定义函数的类型

```ts
interface StudyLanguage {
  (language: ProgramLanguage): void;
}
// 通过这种格式定义的接口类型又被称之为可执行函数,也就是一个函数类型
let StudyInterface: StudyLanguage = (language) =>
  console.log(`${language.name} ${language.age()}`);
//实际上我们很少使用接口来定义函数的类型,更多的是使用内联类型或类型别名配合箭头函数语法来定义函数类型,如下;
type StudyLanguageType = (language: ProgramLanguage) => void;
```

在实际工作中,使用接口类型较多的地方是对象,比如 React 组件的 Props & State、HTMLElement 的 Props,这些对象有一个共性，即所有的属性名、方法名都确定

常见错误代码

- ts(2322)类型不一致
- ts(2345)实参与形参类型不兼容,缺少必要的属性
- ts(2540)不可以给只读属性赋值
- ts(2739)任何不符合约定的情况，都会提示类型错误,缺少全部属性
- ts(2741)缺少部分属性
- ts(2413) 数字索引类型 string 类型不能赋值给字符串索引类型 number
- ts(6196) 错误继承,属性不兼容

既可以使用接口类型来约束类,反过来也可以使用类实现接口

### Type 类型别名

接口类型作用:将内联类型抽离出来,从而实现类型可复用

- 可以使用类型别名接收抽离出来的内联类型实现复用

针对接口类型如法覆盖的场景,只能使用类型别名来接收

```ts
//联合类型
type MixedType = string | number;
// 交叉类型
type IntersectionType = {
  id: number;
  name: string;
} & {
  age: number;
  name: string;
};
// 提取接口属性类型
type AgeType = ProgramLangu
```
## 08 | 高级类型：如何快速读懂联合类型和交叉类型的含义？