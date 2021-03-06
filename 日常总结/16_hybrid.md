## hybird是什么？
用一句话解释就是：
> hybird 是客户端与前端的混合开发解决方案；

## 为何使用 hybird
通常使用原生开发的app，代码跨平台复用性几乎为0，然后就是appstore的审核比较费时，所以混合开发的技术方案就顺势而出

使用hybird开发的好处如下：
- 可以快速迭代更新，无需应用商店审核
> 客户端的代码（安卓用 java，ios 用 oc 或者swift），可以访问手机的一些比较隐私或者深层次的东西，例如横屏，竖屏，获取地理位置，访问手机通讯录或者相册等等
- 用户体验流畅
- 减少开发成本和沟通成本，双端公用一套代码

在进行hybird开发的时候，一定离不开一个概念，那就是webview，
- 首先webview是一个控件
- 其次webview用来加载H5页面，是一个小型的浏览器内核
- 最后webview能够承载一个html页面并且显示出来

在加载H5资源的时候，我们不仅会加载使用http协议的链接，还会其他的协议例如`file://协议`
- 直接打开本地 h5页面就是使用了 file 协议
- 优点在于读取本地资源，速度很快

**在这里穿插一下，先简单介绍一下URI**

URI的结构为：
```
scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]
```

file 协议用于访问本地计算机中文件，好比通过任务管理器打开文件一样，主要是针对本地，即 file 协议是访问本地的资源

**扩展**：

http 协议，https 协议：（加载远程资源的协议）

什么是 http 协议：

http 就是超文本传输协议的缩写，用来从万维网服务器传输超文本到本地浏览器的协议，基于TCP/IP通信来传输数据。http 协议工作于客户端-服务端架构上，浏览器作为 http 客户端通过 url 向 http 服务端发送请求，服务端接收到请求之后，向客户端发送请求。

http 使用统一资源标识符 url 来传输数据和建立连接。


**url 包含的几个部分：**

1. 协议
2. 域名
3. 端口（如果省略端口，则采用默认端口）
    ⚠️注意⚠️：
    - `http` 协议的端口`80`，`8080`，`8081`
    - `https` 协议的端口是`443`
    - `ssh`（安全登录），`scp`（文件传输），端口重定向，端口为`22`
4. 虚拟目录：虚拟目录不是必须部分，是从第一个/开始到左后一个/结束
5. 文件名：从域名最后一个/开始到“？”结束
6. 锚：从#开始到最后都是锚
7. 参数：从？开始到#为止，中间都是参数，参数可以是多个参数，中间以&作为分隔符

`http` 访问本地的 `html` 文件，相当于将本机作为一台 `http` 服务器，然后通过 `localhost` 访问的是自己电脑上的本地服务器，再通过 `http` 服务器去访问本机的文件资源

简单点说就是 `file` 文件只是简单地请求本地文件，将其作为一个服务器未解析的静态文件打开，而 `http` 是在本地搭建一个服务器，再通过服务器去动态解析拿到文件。
## 什么时候使用hybird
首先需要明确的是不是所有的场景都适合使用hybird，具体划分参考如下
- 使用NA：体验要求极致，变化不频繁
- 使用hybird：产品的稳定功能，体验要求高，迭代频繁（新闻详情）
- 使用H5：体验无要求，不常用（如举报，反馈，单次的运营活动或者不常用的功能）
## hybird实现的流程
- 前端做好静态页面，将文件交给客户端
- 客户端拿到静态文件之后，以文件的形式存储在 app 中
- 客户端在一个 webview 中
- 使用file 协议加载静态文件

## hybird 的更新和上线的流程
 app发布之后，静态文件可以使用**热更新**的方式实现更新
 
具体实现流程如下：
- 分版本，有版本号
- 将静态文件压缩成zip 包上传至服务端
- 客户端每次启动，都去服务端检查版本号
- 如果服务端版本号大于客户端版本号，就去下载最新的包
- 下载完成之后解压，然后将现有的文件覆盖
## hybird和H5的区别
[image](/images/20210222_1.png)

## js 与客户端如何通讯
在了解js与客户端通信之前，我们先了解两个概念
> schema协议:使用：NgariHealth://直接打开纳里健康 app

> 内置上线
> - 将封装的schema 协议打包，内置到客户端
> - 客户端每次启动 webview，都默认执行打包好的 invoke.js
> - 本地加载，免去网络加载的时间，更快
> - 本地加载，没有网络请求，黑客看不到 schema 协议，更加安全

通过了解了上面一些基础概念之后，我们可以对js与客户端如何通信进行答题了：
- 通讯的基本形式：调用能力，传递参数，监听回调
- schema协议的理解和使用
- 调用schema 代码的封装
- 内置上线，更快，更安全

  