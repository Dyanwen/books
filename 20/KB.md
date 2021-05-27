## **webpack**模块打包机制

### 安装

1. 环境准备
   - nodejs升级到最新稳定版 

4.x版本

```js
// 推荐局部安装
npm i webpack webpack-cli -D



### 启动

npx webpack

script脚本命令 :webpack --config ./webpack.prod.js

打包出来的文件由之前的普通自执行函数转换为箭头函数自执行函数

### 核心概念

`entry`

 `output`

`mode`:none/development/production默认为production

`Loader`：模块转换器，模块处理器

webpack默认只支持js，json这样的模块，对于css，less等无法解析

`plugins`：webpack的功能扩展

`chunk`：代码片段，

`module`：模块

`bundle`：输出的资源文件就是bundle文件

​```js
/**
* [chunk] :一个模块被webpack处理之后被称为chunk，一个chunks可以对应1或多个模块
* [module] :模块
* [bundle] :由runtime以及chunks组成，一个bundle对应一个chunks
*/
```



## webpack前端项目工程化实战

- 是pc还是移动端

  - 移动端spa
  - pc端mpa
  - 兼容性：需要兼容的浏览器和版本

- 多人 参与还是 单人

  - 代码规范
  - 

- 技术栈

  - vue
  - react
  - 样式处理
    - less
    - sass
  - TS babel =》es6+
  - 模版引擎
    - ejs
    - pug
  - 是否需要支持第三方字体
  - iconfont

- 工具类

  - 安 装依赖包，切换国内源npm config
  - .npmrc

- eslint + prettier

- 提交规范

  

```js
/**
* [hash] :是代码发生改变，hash就会改变
* [chunkhash] :相互依赖的内容为一个chunk
* [contenthash] :自身内容发生变化，contenthash才会发生变化
*/
```



#### 自定义loader

 ```js
 // 这里必须是声明函数，不能是箭头函数，这是因为很多的api都是挂在this上面的 
 // 必须又返回值  
 module.export = function(source){
 	console.log(source)
 }
 ```

## 多页面打包通用方案

```js
const setMpa = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
    entryFiles.map((item, index) => {
        const entryFile = item;
        const matchFile = entryFile.match(/src\/(.*)\/index\.js$/);
        const pageName = matchFile[1];

        entry[pageName] = entryFile
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName]
        }))
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMpa();
```



### webpack热更新

css热更新只能使用style-loader,并且不能配置`.browserslistrc`

### babel 

- 语法转换const -》var
  - promise symbol proxy，实例方法 =========polyfill
  - 解决方案就是在当前环境添加解决方案

配置文件

-  

- babel.config.js
- 在package.json中添加babel：{}
- 配置babel-loader





Core-js2.x和core-js3.x的区别

语法支持的更多



### plugins

对webpack功能的拓展

- 触发时机
- 生成某种资源，或者一些操作



webpack从打包开始到结束是有生命周期的概念的，是有一种钩子的概念

23个钩子：

```js
run ===> contextModuleFactory
run ===> beforeCompile
run ===> compile
run ===> thisCompilation
run ===> compilation
run ===> make
run ===> normalModuleFactory
run ===> contextModuleFactory
run ===> beforeCompile
run ===> compilation
run ===> finishMake
run ===> finishMake
run ===> afterCompile
run ===> afterCompile
run ===> shouldEmit
run ===> emit // 输出资源到output目录之前
run ===> assetEmitted
run ===> afterEmit
run ===> done	//在compilation完成时执行
run ===> afterDone
```

## webpack打包bundle原理分析与实践

npx webpack

​	webpack->config->打包入口 输出目录（入口文件在哪）->入口文件->分析是否有依赖，以及依赖模块的路径->解析处理内容（es6->es5）->chunk code(缺失函数，require exports)



```js
(function(){
	// 缺失函数的补齐
  require 
  	eval(chunk code)
  exports
})({
  // 依赖模块 入口模块的路径为key：
  key:模块处理后的chunkcode
})
```

创建一个simple-webpack

- webpack.config.js
  - entry
  - output
  - mode
- lib
  - Webpack.js
    - webpack class
    - Run()
      - 入口文件的路径
      - 分析文件的内容
      - 内容处理
      - chunkcode
    - 递归处理所有的依赖
    - 生成bundle结构，生成文件，放入dist目录
  - Bundle.js
    - 引入lib/webpack.js
    - 引入webpack options
    - complier = webpack（config）
    - complier.run()
    - node bundle.js

### 性能分析

- 性能优化
- 不知道如何优化-》缺少数据支撑
  - lighthouse 
  - 传统的性能监控方案，埋点统计，简单demo

