## 怎么实现元素的水平垂直居中

```css
// 方法1
div {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  position: relative;
}
p {
  width: 50px;
  height: 50px;
  background-color: aqua;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
// 方法2
div {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  position: relative;
}
p {
  width: 50px;
  height: 50px;
  background-color: aqua;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
// 方法3
div {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
}
p {
  width: 50px;
  height: 50px;
  background-color: aqua;
}

// 行内元素 方法一
div {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  text-align: center;
  line-height: 200px;
}
span {
  background-color: aqua;
}
// 行内元素 方法二
div {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
span {
  background-color: aqua;
}
```


