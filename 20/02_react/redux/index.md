# Redux

> 三大原则：
> 单一数据源，state 是只读的，使用纯函数执行修改

## 基础

### Action

`Action`是把数据从应用传到`store`的有效载体，它是`store`数据的唯一来源，一般会通过`store.dispatch（）`将`action`传递到`store`

我们应该尽量减少在`action`中传递数据

PS：重点区分 Action 和 Action 创建函数

*Action 创建函数*就是生成 action 的方法。

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
dispatch(addTodo(text));
```

或者创建一个**被绑定的 action 创建函数**来自动执行 dispatch()

```js
const boundAddTodo = (text) => dispatch(addTodo(text));
```

### Reducer

> reducer 指定了应用状态的变化如何响应 actions 并发送到 store,记住 actions 只是描述了有事情发生,并没有描述应用如何更新 state

应援不要在 reducer 里做这些操作:

- 修改传入的参数
- 执行有副作用的操作,如 api 请求或者路由跳转
- 调用非纯函数,如 Date.now(),或者 Math.random()

### store

store 有以下职责

- 维持应用的 state
- 提供 getState()方法获取 state
- 提供 dispatch(action)方法更新 state
- 提供 subscribe(listener)注册监听器
- 通过 subscribe(listener)返回的函数注销监听器

```js
import { createStore } from "redux";
import todoApp from "./reducer";
let store = createStore(todoApp);
```

### 数据流

> 严格的单向数据流是 Redux 架构的设计核心

redux 应用中数据的生命周期遵循下面 4 个步骤:

- 调用 store.dispatch(action)
- redux store 调用传入的 reducer 函数:store 会把两个参数传入 reducer:当前 state 树和 action.

```js
let previousState = {
  visibleTodoState: "SHOW_ALL",
  todos: [
    {
      text: "read the docs",
      complete: false,
    },
  ],
};
let action = {
  type: "ADD_TODO",
  text: "Understand the flow",
};
let nextState = todoApp(previousState, action);
```

- 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树
- redux store 保存了根 reducer 返回的完整 state 树

### 搭配 react

|                |        展示组件         |            容器组件             |
| :------------- | :---------------------: | :-----------------------------: |
| 作用           | 描述如何展示(骨架,样式) | 描述如何运行(数据获取,状态更新) |
| 直接使用 redux |           否            |               是                |
| 数据来源       |          props          |        监听 redux state         |
| 数据修改       |  从 props 调用回调函数  |    向 redux 调用 action 函数    |
| 调用方式       |          手动           |     通常由 react-redux 完成     |
