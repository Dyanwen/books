/**
 * 现在的模块机制
 * 模块模式的两个特点:
 * - 必须有外部的封闭函数,该函数至少必须被调用一次
 * - 封闭函数必须返回至少一个内部函数,这样内部函数才能在私有作用域中形成闭包,并且可以访问或者修改私有变量
 */

const MyModules = (function () {
    let modules = {}
    function define(name, deps, impl) {
        for (let i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]]
        }
        modules[name] = impl.apply(impl, deps)
    }
    function get(name) {
        return modules[name]
    }
    return {
        define,
        get
    }
}())

MyModules.define('bar', [], function () {
    function hello() {
        console.log('hello')
    }
    return {
        hello
    }
})

MyModules.define('foo', ['bar'], function () {
    function awesome() {
        console.log('bar')
        console.log(bar.hello())
    }
    return { awesome };
})

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

bar.hello()

foo.awesome(); // LET ME INTRODUCE: HIPPO


/**
 * 未来的模块机制
 * es6的模块机制,需要将模块写在单独的文件中
 * import可以将一个模块中的一个或者多个api导入到当前作用域中,并分别绑定到一个变量上
 * module可以将整个模块的api导入并且绑定到一个变量上
 */