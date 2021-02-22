在本篇文章中，目标是掌握 `npm init` 命令，`npm` 脚本基本执行流程，动手给项目增加 `eslint` 命令，熟悉创建自定义命令的基本流程，运行多个`npm script`的方式，以及给`npm script`传递参数和添加注释

## 用 npm init 快速创建项目
npm 为我们提供了快速创建 package.json 文件的命令 npm init，执行该命令会问几个基本问题，如包名称、版本号、作者信息、入口文件、仓库地址、许可协议等，多数问题已经提供了默认值，你可以在问题后敲回车接受默认值
```json
package name: (hello-npm-script)
version: (0.1.0)
description: hello npm script
entry point: (index.js)
test command:
git repository:
keywords: npm, script
license: (MIT)
```
> 也可以使用 npm init -f（意指 --force，或者使用 --yes）告诉 npm 直接跳过参数问答环节，快速生成 package.json

## 用 npm run 执行任意命令
npm 是如何管理和执行各种 scripts 的呢？作为 npm 内置的核心功能之一，npm run 实际上是 npm run-script 命令的简写。当我们运行 npm run xxx 时，基本步骤如下：
1. 从 package.json 文件中读取 scripts 对象里面的全部配置；
2. 以传给 npm run 的第一个参数作为键，本例中为 xxx，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；
3. 在系统默认的 shell 中执行上述命令，系统默认 shell 通常是 bash，windows 环境下可能略有不同

## 创建自定义 npm script
1. 准备被检查的代码
2. 添加 eslint 依赖

将 eslint 添加为devDependencies：
```js
npm install eslint -D
```
3. 初始化 eslint 配置

用 eslint 做检查需要配置规则集，存放规则集的文件就是配置文件，使用如下文件生成配置文件
```js
./node_modules/.bin/eslint --init
```
4. 添加 eslint 命令

在 package.json 的 scripts 字段中新增命令 eslint：
```
{
  "scripts": {
    "eslint": "eslint *.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```
##  运行多个 npm script 
在平时的开发过程中,通常会对js,css,json,less,scss,markdown等格式文件进行校验,保障代码质量,代码检查不仅保障代码没有低级的语法错误，还可确保代码都遵守社区的最佳实践和一致的编码风格

我通常会给前端项目加上下面 4 种代码检查
* [eslint](https://eslint.org)，可定制的 js 代码检查，1.1 中有详细的配置步骤；
* [stylelint](https://stylelint.io)，可定制的样式文件检查，支持 css、less、scss；
* [jsonlint](https://github.com/zaach/jsonlint)，json 文件语法检查，踩过坑的同学会清楚，json 文件语法错误会知道导致各种失败；
* [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)，Markdown 文件最佳实践检查，个人偏好；

包含了基本的代码检查命令的 package.json 如下：
```json
{
  "name": "hello-npm-script",
  "version": "0.1.0",
  "main": "index.js",
  "scripts": {
    "lint:js": "eslint *.js",
    "lint:css": "stylelint *.less",
    "lint:json": "jsonlint --quiet *.json",
    "lint:markdown": "markdownlint --config .markdownlint.json *.md"
  },
  "devDependencies": {
    "eslint": "^4.11.0",
    "jsonlint": "^1.6.2",
    "markdownlint-cli": "^0.5.0",
    "stylelint": "^8.2.0",
    "stylelint-config-standard": "^17.0.0"
  }
}
```
## 让多个 npm script 串行
直接让多个 npm script 串行的典型用例，实现方式也比较简单，只需要用 `&&` 符号把多条 npm script 按先后顺序串起来即可

## 让多个 npm script 并行
把子命令的运行从串行改成并行，实现方式更简单，把连接多条命令的 `&&` 符号替换成 `&` 即可

因为并行执行命令就好像js发起异步请求一样,不能确定线程的执行顺序,有可能存在耗时特别长的任务,从而触发进程退出之后才会输出结果

此时只需要在命令的结尾加上`& wait` 即可
```js
"test": "npm run lint:js & npm run lint:css & npm run lint:json & npm run lint:markdown"
```
### 更好的串行&&并行执行方式
可以使用第三方的npm包,`npm-run-all`,在`package.json`中安装如下
```js
npm i npm-run-all -D
```
#### 串行方式使用方式
```js
"test": "npm-run-all lint:js lint:css lint:json lint:markdown"
```
npm-run-all 还支持通配符匹配分组的 npm script，上面的脚本可以进一步简化成：
```js
"test": "npm-run-all lint:*"
```
#### 并行使用方式
```js
"test": "npm-run-all --parallel lint:*"
```
## 给 npm script 传递参数
eslint 内置了代码风格自动修复模式，只需给它传入 `--fix` 参数即可，在 scripts 中声明检查代码命令的同时你可能也需要声明修复代码的命令，面对这种需求，大多数同学可能会忍不住复制粘贴，如下：
```
"lint:js": "eslint *.js",
"lint:js:fix": "eslint *.js --fix"
```
在 `lint:js` 命令比较短的时候复制粘贴的方法简单粗暴有效，但是当 `lint:js` 命令变的很长之后，难免后续会有人改了 `lint:js` 而忘记修改 `lint:js:fix`，更健壮的做法是，在运行 npm script 时给定额外的参数，代码修改如下：
```js
"lint:js": "eslint *.js",
"lint:js:fix": "npm run lint:js -- --fix"
```
要格外注意 `--fix` 参数前面的 `--` 分隔符，意指要给 `npm run lint:js` 实际指向的命令传递额外的参数。

## 给 npm script 添加注释
为了增加代码的可读性,给命令添加注释是不可避免的,但是因为json文件天然是不支持注释的,所以我们可以使用下面两种trick的形式:

1. package.json 中可以增加 `//` 为键的值，注释就可以写在对应的值里面
```
"//": "运行所有代码检查和单元测试",
"test": "npm-run-all --parallel lint:*"
```
2.  在script 声明中做手脚
> 因为命令的本质是 shell 命令（适用于 linux 平台），我们可以在命令前面加上注释
```
"test": "# 运行所有代码检查和单元测试 \n    npm-run-all --parallel lint:*"
```
## 调整 npm script 的日志输出
### 1.默认日志输出级别
即不加任何日志控制参数得到的输出，可能是你最常用的，能看到执行的命令、命令执行的结果
### 2.显示尽可能少的有用信息
需要使用 `--loglevel silent`，或者 `--silent`，或者更简单的 `-s` 来控制，这个日志级别的输出实例如下（只有命令本身的输出，读起来非常的简洁）
### 3.显示尽可能多的运行时状态
排查脚本问题的时候比较有用，需要使用 `--loglevel verbose`，或者 `--verbose`，或者更简单的 `-d` 来控制，这个日志级别的输出实例如下（详细打印出了每个步骤的参数、返回值，下面的截图只是部分）



