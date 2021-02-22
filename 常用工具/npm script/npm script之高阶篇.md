在这篇文章中，我们将深入学习`npm script`，主要包含实现`npm script`跨平台兼容，将庞大的`npm script`拆分到单独的文件中，以及使用`node.js`脚本替代复杂的`npm script`

## 跨平台兼容
在日常开发的过程中，不是所有的`shell`命令都是跨平台兼容的，甚至各种常见的文件系统，变量引用，环境变量设着都是不兼容的

接下来提供一些跨平台解决方案：

### 文件系统操作的跨平台
npm script中涉及到文件系统操作包含文件和目录的创建，删除，移动，复制等操作，而这些社区都有相应的跨平台兼容包，如下：
*   [rimraf](https://github.com/isaacs/rimraf) 或 [del-cli](https://www.npmjs.com/package/del-cli)，用来删除文件和目录，实现类似于 `rm -rf` 的功能；
*   [cpr](https://www.npmjs.com/package/cpr)，用于拷贝、复制文件和目录，实现类似于 `cp -r` 的功能；
*   [make-dir-cli](https://www.npmjs.com/package/make-dir-cli)，用于创建目录，实现类似于 `mkdir -p` 的功能；

**注**：使用方法如下：
  * `rm -rf` 直接替换成 `rimraf`；
  * `mkdir -p` 直接替换成 `make-dir`；
  * `cp -r` 的替换需特别说明下，`cpr` 默认是不覆盖的，需要显示传入 `-o` 配置项，并且参数必须严格是 `cpr <source> <destination> [options]` 的格式，即配置项放在最后面；
  * 把 `cover:cleanup` 从 `postcover` 挪到 `precover` 里面去执行，规避 `cpr` 没归档完毕覆盖率报告就被清空的问题；
  
### 用 cross-var 引用变量
Linux 和 Windows 下引用变量的方式是不同的，Linux 下直接可以用 `$npm_package_name`，而 Windows 下必须使用 `%npm_package_name%`

安装方法如下：
```
npm i cross-var -D
```
使用时，如果命令中只有一个变量，直接在命令的前面添加`cross-var`即可，但是如果命令中含有两条子命令，我们需要用引号将整个命令包起来（注意这里使用双引号，且必须使用\转义），然后在前面加上`cross-var`
### 用 cross-env 设置环境变量
在 node.js 脚本和 npm script 使用环境变量也是比较常见的，比如我们在运行测试时，需要加上 `NODE_ENV=test`，或者在启动静态资源服务器时自定义端口号。因为不同平台的环境变量语法不同，我们可以使用 [cross-env](https://www.npmjs.com/package/cross-env) 来实现 npm script 的跨平台兼容

第 1 步，添加 cross-env 到开发依赖：
```
npm i cross-env -D
```
第 2 步，改写使用了环境变量的 npm script：
```
  "scripts": {
-    "test": "NODE_ENV=test mocha tests/",
+    "test": "cross-env NODE_ENV=test mocha tests/",
  },
```
## 拆到单独文件中
将`npm script`拆分到单独的文件中，使用的技术方案 [scripty](https://github.com/testdouble/scripty) 也是借鉴了`bash`脚本

1. 安装依赖
```
npm i scripty -D
```
2. 准备目录和文件
```
mkdir -p scripts/cover
```
先创建两层的目录，因为我们计划把 cover 脚本写成多个，方便单独去执行，这里命名为 scripts 是 scripty 默认的，实际上是可以自定义的。
```
touch scripts/cover.sh
touch scripts/cover/serve.sh
touch scripts/cover/open.sh
```
然后创建空白的脚本文件，因为有了单独的脚本，我们可以把原来的 precover、cover、postcover、cover:archive、cover:cleanup 合并到一个文件中。

**特别注意的是，给所有脚本增加可执行权限是必须的，否则 scripty 执行时会报错**，我们可以给所有的脚本增加可执行权限：
```
chmod -R a+x scripts/**/*.sh
```
3. 修改 scripty 脚本

准备好目录和文件之后，接下来需要给脚本填充内容，脚本内容如下（因为脚本使用的是 bash，所以直接忽略了跨平台兼容的处理，跨平台兼容脚本最好使用 Node.js 编写，下节会介绍）：

`scripts/cover.sh` 内容如下（cleanup --> cover --> archive --> preview）：
```bash
#!/usr/bin/env bash

# remove old coverage reports
rimraf coverage && rimraf .nyc_output

# run test and collect new coverage
nyc --reporter=html npm run test

# achive coverage report by version
mkdir -p coverage_archive/$npm_package_version
cp -r coverage/* coverage_archive/$npm_package_version

# open coverage report for preview
npm-run-all --parallel cover:serve cover:open
```
`scripts/cover/serve.sh` 内容如下：

```
#!/usr/bin/env bash

http-server coverage_archive/$npm_package_version -p $npm_package_config_port

```

`scripts/cover/open.sh` 内容如下（这里有个 sleep，是为了确保文件系统写入完成）：

```
#!/usr/bin/env bash

sleep 1
opn http://localhost:$npm_package_config_port

```

细心的同学可能注意到了，在 shell 脚本里面是可以随意使用 npm 的内置变量和自定义变量的。

4. 修改 package.json

主要改动是清理 cover:\* 命令，接入 scripty，具体的命令如下：
```
"scripts": {
     "test": "cross-env NODE_ENV=test mocha tests/",
     "cover": "scripty",
     "cover:serve": "scripty",
     "cover:open": "scripty"
}
```
这里我们只保留了 cover、cover:serve、cover:open 等 3 个命令，让它们都指向 scripty，调用哪个脚本都由 scripty 来处理。

## 用 node.js 脚本替代复杂的 npm script

使用 Node.js 来编写复杂的 npm script 具有明显的 2 个优势：
- 首先，编写简单的工具脚本对前端工程师来说额外的学习成本很低甚至可以忽略不计
- 其次，因为 Node.js 本身是跨平台的，用它编写的脚本出现跨平台兼容问题的概率很小

1. 安装 shelljs 依赖
```
npm i shelljs -D
npm i chalk -D //给输出加点颜色
```
2. 创建 Node.js 脚本
```
touch scripts/cover.js
```
3. 用 Node.js 实现同等功能
```
const { rm, cp, mkdir, exec, echo } = require('shelljs');
const chalk = require('chalk');

console.log(chalk.green('1. remove old coverage reports...'));
rm('-rf', 'coverage');
rm('-rf', '.nyc_output');

console.log(chalk.green('2. run test and collect new coverage...'));
exec('nyc --reporter=html npm run test');

console.log(chalk.green('3. archive coverage report by version...'));
mkdir('-p', 'coverage_archive/$npm_package_version');
cp('-r', 'coverage/*', 'coverage_archive/$npm_package_version');

console.log(chalk.green('4. open coverage report for preview...'));
exec('npm-run-all --parallel cover:serve cover:open');
```
关于改动的几点说明：

*   简单的文件系统操作，建议直接使用 shelljs 提供的 cp、rm 等替换；
*   部分稍复杂的命令，比如 nyc 可以使用 exec 来执行，也可以使用 istanbul 包来完成；
*   在 exec 中也可以大胆的使用 npm script 运行时的环境变量，比如 `$npm_package_version`；

4. 让 package.json 指向新脚本
```
"scripts": {
     "test": "cross-env NODE_ENV=test mocha tests/",
     "cover": "node scripts/cover.js",
     "cover:open": "scripty"
   },
```
5. 测试 cover 命名

重新运行 npm run cover 命令
