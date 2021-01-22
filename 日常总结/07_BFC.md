# BFC
## BFC是什什么，怎么创建一个BFC

> BFC块级格式化上下文，是一个独立的渲染区域，规定不管内部的元素如何布局和外部毫无关系

## 满足下列任意一个条件：

- float的值不是none，设置为left，会将元素移动到左侧，并会被其他元素环绕
- position的属性不是static或者relative
- display的值为inline-block，table-cell，flex，
- overflow不为visible，如何设置为hidden将会裁剪溢出的元素

## BFC的特性:
- 使BFC内部浮动元素不会到处乱跑
- 和浮动元素产生边界