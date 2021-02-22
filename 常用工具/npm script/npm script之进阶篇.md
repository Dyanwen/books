上篇文章中我们了解了npm script的基本使用，在这篇文章中，我们将主要学习npm script的钩子，在npm script中使用环境变量以及实现npm script命令的自动补全功能

## 认识npm script的钩子

为了实现可以让开发者自定义执行顺序，npm script的设计者为命令的执行增加了类似生命周期的机制。具体来说就是`pre`和`post`钩子脚本，这种特性在执行前检查，执行后清理的的情况下非常有用。

例如运行`npm run test` 的时候，就分3个阶段：
1. 检查`scripts`对象中是否存在`pretest`命令，如果有，先执行该命令；
2. 检查是否有`test`命令，有的话运行`test`命令，没有的话报错；
3. 检查是否存在`posttest`命令，如果有，执行`posttest`命令；


在前面的学习中，我们已经添加了代码检查的功能，接下来我们接着引入测试自动化运行环节，**衡量测试效果的重要指标是测试覆盖率**，而收集覆盖率也是非常简单。**下面逐步讲解如何把代码检查，测试运行，覆盖率收集这些代码步骤串联起来**

为代码添加必要的单元测试也是质量保障的重要手段，常用的单测技术栈是：
* [mocha](https://mochajs.org)，测试用例组织，测试用例运行和结果收集的框架；
* [chai](http://chaijs.com)，测试断言库，必要的时候可以结合 [sinon](http://sinonjs.org) 使用；
```json
"test": "mocha tests/"
```
首先需要做的就是改造`test`命令

我们基于钩子机制对现有的`scripts`做如下3点重构，把代码检查和测试运行串起来
- 增加简单的`lint`命令，并行运行所有的`lint`子命令
- 增加`pretest`钩子，在其中运行`lint`命令
- 把`test`替换为更加简单的`mocha tests/`
```json
"lint": "npm-run-all --parallel lint:*",
"mocha": "mocha tests/",
"pretest": "npm run lint",
"test": "mocha tests/"
```
## 增加覆盖率收集
接下来，我们把运行测试和覆盖率收集串起来，具体做法是：增加覆盖率收集的命令，并且覆盖率收集完毕之后自动打开 html 版本的覆盖率报告。要实现目标，我们需要引入两个新工具：

1.  覆盖率收集工具 [nyc](https://github.com/istanbuljs/nyc)，是覆盖率收集工具 [istanbul](https://istanbul.js.org) 的命令行版本，istanbul 支持生成各种格式的覆盖率报告；
2.  打开 html 文件的工具 [opn-cli](https://github.com/sindresorhus/opn-cli)，是能够打开任意程序的工具 [opn](https://github.com/sindresorhus/opn) 的命令行版本，作者是前端社区非常高产的 [Sindre Sorhus](https://github.com/sindresorhus)，它在 npm 上发布了超过 1000 个包，并且质量都很不错。

安装命令如下：
```
npm i nyc opn-cli -D
```
然后在 package.json 增加 nyc 的配置，告诉 nyc 该忽略哪些文件。最后是在 scripts 中新增 3 条命令：

1.  `precover`，收集覆盖率之前把之前的覆盖率报告目录清理掉；
2.  `cover`，直接调用 nyc，让其生成 html 格式的覆盖率报告；
3.  `postcover`，清理掉临时文件，并且在浏览器中预览覆盖率报告；

```json
 scripts: {
+    "precover": "rm -rf coverage",
+    "cover": "nyc --reporter=html npm test",
+    "postcover": "rm -rf .nyc_output && opn coverage/index.html"
   },
   "devDependencies": {
     "npm-run-all": "^4.1.2",
+    "nyc": "^11.3.0",
+    "opn-cli": "^3.1.0",
     "stylelint": "^8.2.0",
     "stylelint-config-standard": "^17.0.0"
+  },
+  "nyc": {
+    "exclude": [
+      "**/*.spec.js",
+      ".*.js"
+    ]
   }
 }
```
## 使用预定义变量
在使用之前，我们可以通过`npm run env`拿到完整的变量列表，里面包含的内容超级多，因此可以使用`npm run env | grep npm_package | sort`拿到部分排序后的预定义环境变量

这里内容就不贴出来了，大家可以动手跑一下

变量的使用方法遵循 shell 里面的语法，直接在 npm script 给想要引用的变量前面加上 `$` 符号即可。比如
```
{
  "dummy": "echo $npm_package_name"
}
```
在项目中，测试覆盖率归档是比较常见的需求，因为它方便我们追踪覆盖率的变化趋势，最彻底的做法是归档到CI系统里面，对于简单项目，则可以直接归档到文件系统中，即把收集到的覆盖率报告按照版本号去存放

比如，我们在根目录下新建 coverage\_archive 目录存储覆盖率归档，并利用变量机制把归档和版本号关联起来。具体的 npm script 修改如下：
```json
   "scripts": {
-    "precover": "rm -rf coverage",
     "cover": "nyc --reporter=html npm test",
-    "postcover": "rm -rf .nyc_output && opn coverage/index.html"
+    "cover:cleanup": "rm -rf coverage && rm -rf .nyc_output",
+    "cover:archive": "mkdir -p coverage_archive/$npm_package_version && cp -r coverage/* coverage_archive/$npm_package_version",
+    "postcover": "npm run cover:archive && npm run cover:cleanup && opn coverage_archive/$npm_package_version/index.html"
   },
```
主要改动是：增加 cover:cleanup 和 cover:archive 命令，并且修改 postcover 命令。下面对使用了环境变量的 npm script 稍作解释：

cover:archive 做了 2 件事情：

1.  `mkdir -p coverage_archive/$npm_package_version` 准备当前版本号的归档目录；
2.  `cp -r coverage/* coverage_archive/$npm_package_version`，直接复制文件来归档；

而 postcover 做了 3 件事情：

1.  `npm run cover:archive`，归档本次覆盖率报告；
2.  `npm run cover:cleanup`，清理本次覆盖率报告；
3.  `opn coverage_archive/$npm_package_version/index.html`，直接预览覆盖率报告；

## 使用自定义变量
除了预定义变量外，我们还可以在 package.json 中添加自定义变量，并且在 npm script 中使用这些变量。

为把测试覆盖率报告分享给其他同事浏览，我们就不能使用 opn-cli 打开文件了，需要启动简单的 http 服务，把网址发给别人浏览，比如我们约定网址 `http://IP:3000`，这里的 IP 需要替换成自己的实际 IP。

[http-server](https://www.npmjs.com/package/http-server) 提供了非常轻量的 http 服务，我们先把它加到 devDependencies 中：

```js
npm i http-server -D    # 等价命令 npm install http-server --save-dev
```
接下来，在 package.json 增加自定义端口配置和相应的 npm script 命令， 如下：
```
   "version": "0.1.0",
+  "config": {
+    "port": 3000
+  },
   "scripts": {
     "cover": "nyc --reporter=html npm test",
-    "postcover": "npm run cover:archive && npm run cover:cleanup && opn coverage_archive/$npm_package_version/index.html"
+    "cover:serve": "http-server coverage_archive/$npm_package_version -p $npm_package_config_port",
+    "cover:open": "opn http://localhost:$npm_package_config_port",
+    "postcover": "npm-run-all cover:archive cover:cleanup --parallel cover:serve cover:open"
   },
   "devDependencies": {
     "chai": "^4.1.2",
+    "http-server": "^0.10.0",
     "mocha": "^4.0.1",
    }
```
**注**：不能在自定义变量的声明中使用预定义变量。

## 使用 npm run 直接列出

在这个结果里面，我们可以进行类似于 Vim 中的搜索，先按 `/` 进入搜索模式，然后输入 `markdown`，搜索结果如

## 把 npm completion 集成到 shell 中
### 简单粗暴的方法如下
直接将npm completion产生的一堆shell代码插入文件
```
npm completion >> ~/.bashrc
npm completion >> ~/.zshrc
```
### 建立一个独立的文件，然后加载
第 1 步，把 npm completion 产生的那坨命令放在单独的文件中：
```
npm completion >> ~/.npm-completion.bash
```
第 2 步，在 .bashrc 或者 .zshrc 中引入这个文件：
```
echo "[ -f ~/.npm-completion.bash ] && source ~/.npm-completion.bash;" >> ~/.bashrc
echo "[ -f ~/.npm-completion.bash ] && source ~/.npm-completion.bash;" >> ~/.zshrc
```
执行完上述命令之后，一定要记得执行`source ~/.zshrc` 或者 `source ~/.bashrc`



