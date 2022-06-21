## 关于“jsx”的 3 个问题

### 1.`jsx` 的本质是什么?它和 `js` 之间到底有什么关系?

> `jsx` 是 `javascript` 的一种语法扩展,它和模版语言很接近,但是它充分具备 `javascript` 的能力
> 但是浏览器并不会像天然支持`js`一样支持`jsx`,所以出现了`babel`转换器,`jsx`会被编译成`React.createElement()`,`React.createElement()`将返回一个叫作`React Element`的对象

### 2.为什么要用 jsx,如果不用的会有什么后果?

> `jsx`语法糖允许前端开发者使用我们最为熟悉的 html 标签语法来创建虚拟 dom,在降低学习成本的同时,也提升了研发效率和研发体验

### 3.jsx 背后的功能模块是什么?这个功能模块都做了哪些事情?

> `createElement()`就像是开发者和`ReactElement`调用之间的一个转换器,一个数据处理层,它可以从开发者处接受相对简单的一些参数,然后将这些参数按照`ReactElement`的预期做一层格式化,最终通过调用`ReactElement`来实现元素的创建

## 为什么 React 16 要更改组件的生命周期？

- “渲染工作流”指的是从组件数据改变到组件实际更新发生的过程
- componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的
- React 16 之前，render 方法必须返回单个元素，而 React 16 允许我们返回元素数组和字符串
- getDerivedStateFromProps
  - getDerivedStateFromProps 是一个静态方法。静态方法不依赖组件实例而存在，因此你在这个方法内部是访问不到 this 的
  - 该方法可以接收两个参数：props 和 state，它们分别代表当前组件接收到的来自父组件的 props 和当前组件自身的 state
  - getDerivedStateFromProps 必须有一个对象格式的返回值,是因为 React 需要用这个返回值来更新（派生）组件的 state
  - getDerivedStateFromProps 方法对 state 的更新动作并非“覆盖”式的更新，而是针对某个属性的定向更新

## 数据是如何在 React 组件之间流动的？

- 数据流是单向流动的
- 父子之间通过 props 传递
- 兄弟之间可以通过父元素作为中介,也可以通过发布订阅形式
- 深层嵌套的组件可以通过 context 形式,在根组件设置 provider
- 如果组件之前的状态不确定可以通过 redux 形式
  - redux 是 js 的状态容器,它提供了可预测的状态管理
  - redux 就是一个存放公共数据的仓库
  - redux通过提供一个统一的状态管理,使得数据能够自由而有序的在任意组件之间穿梭
  - Redux 主要由三部分组成：store、reducer 和 action
    - store 就好比组件群里的“群文件”，它是一个单一的数据源，而且是只读的；
    - action 人如其名，是“动作”的意思，它是对变化的描述。
    - reducer 是一个函数，它负责对变化进行分发和处理， 最终将新的数据返回给 store。

## React-Hooks 设计动机与工作模式
- 函数组件会捕获render内部的状态,也从而证明了函数组件真正的将数据和渲染绑定在了一起
- 状态和修改状态的API名都是可以自定义的
- useEffect 是用于为函数组件引入副作用的钩子
- useEffect 回调中返回的函数被称为“清除函数”
