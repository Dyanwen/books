## 关于“jsx”的 3 个问题

### 1.`jsx` 的本质是什么?它和 `js` 之间到底有什么关系?

> `jsx` 是 `javascript` 的一种语法扩展,它和模版语言很接近,但是它充分具备 `javascript` 的能力
> 但是浏览器并不会像天然支持`js`一样支持`jsx`,所以出现了`babel`转换器,`jsx`会被编译成`React.createElement()`,`React.createElement()`将返回一个叫作`React Element`的对象

### 2.为什么要用 jsx,如果不用的会有什么后果?

> `jsx`语法糖允许前端开发者使用我们最为熟悉的 html 标签语法来创建虚拟 dom,在降低学习成本的同时,也提升了研发效率和研发体验

### 3.jsx 背后的功能模块是什么?这个功能模块都做了哪些事情?
> `createElement()`就像是开发者和`ReactElement`调用之间的一个转换器,一个数据处理层,它可以从开发者处接受相对简单的一些参数,然后将这些参数按照`ReactElement`的预期做一层格式化,最终通过调用`ReactElement`来实现元素的创建




