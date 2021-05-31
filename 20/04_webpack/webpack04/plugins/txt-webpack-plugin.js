class TxtWebpackPlugin {
    constructor(options) {
        console.log(options)
    }
    // 如何钩入钩子
    apply(compiler) {
        compiler.hooks.emit.tapAsync('TxtWebpackPlugin', (complication, cb) => {
            complication.assets["test.txt"] = {
                source: function () {
                    return "hello world"
                },
                size: function () {
                    return 1024
                }
            }
            // console.log('以异步方式触及 compile 钩子')
            cb();
        })

        compiler.hooks.compile.tap('TxtWebpackPlugin', params => {
            // console.log('以同步方式触及 compile 钩子。')
        })
    }
}

module.exports = TxtWebpackPlugin;