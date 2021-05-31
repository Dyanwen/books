class RemoveCommentsPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("RemoveCommentsPlugin", compilation => {
            for (const name in compilation.assets) {
                if (name.endsWith('.js')) {
                    const contents = compilation.assets[name].source();
                    const noContents = contents.replace(/\/\*{2,}\/?/g, '');
                    compilation.assets[name] = {
                        source: () => noContents,
                        size: () => noContents.length
                    }
                }
            }
        })
        console.log('RemoveCommentsPlugin 启动');
    }
}
module.exports = RemoveCommentsPlugin;