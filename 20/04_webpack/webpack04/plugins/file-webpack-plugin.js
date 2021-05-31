class fileWebpackPlugin {
    constructor() { }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('fileWebpackPlugin', (compilation, cb) => {
            const len = Object.keys(compilation.assets).length;
            let content = `文件的总数为${len},文件的名字为：\n`

            for (const key in compilation.assets) {
                content += key + '\n';
            }

            compilation.assets["test.txt"] = {
                source: function () {
                    return content
                },
                size: function () {
                    return 1024
                }
            }
            cb();
        })

    }
}

module.exports = fileWebpackPlugin;