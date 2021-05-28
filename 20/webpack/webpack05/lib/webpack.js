const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;//ast的增删改查
const { transformFromAst } = require("@babel/core");


module.exports = class webpack {
    constructor(options) {
        this.entry = options.entry;
        this.output = options.output;
        this.modules = [];
    }
    run() {
        const info = this.parse(this.entry)
        // 递归处理所有的依赖
        this.modules.push(info);
        for (let i = 0; i < this.modules.length; i++) {
            const { dependencies } = this.modules[i]
            if (dependencies !== {}) {
                for (const key in dependencies) {
                    this.modules.push(this.parse(dependencies[key]));
                }
            }
        }
        let obj = {};
        // 修改数据结构,数组转对象
        this.modules.forEach(item => {
            obj[item.entryFile] = {
                dependencies: item.dependencies,
                code: item.code
            }
        })
        // 生成文件
        this.file(obj);

    }
    file(code) {
        const outputPath = path.join(this.output.path, this.output.filename);
        const newCode = JSON.stringify(code);

        // 生成bundle
        const bundle = `
            (function (modules) {
                function require(module) {
                    
                    function newRequire(relativePath) {
                       return require(modules[module].dependencies[relativePath]);
                    }

                    var exports = {};
                    (function (require,exports,code) {
                        eval(code)
                    })(newRequire,exports, modules[module].code)

                    return exports;
                }

                require('${this.entry}');

            })(${newCode})`
        fs.writeFileSync(outputPath, bundle, "utf-8")
    }
    parse(entryFile) {
        // 如何读取模块的内容
        const content = fs.readFileSync(entryFile, 'utf-8')
        const ast = parser.parse(content, {
            sourceType: "module",
        })
        const dependencies = {};
        traverse(ast, {
            ImportDeclaration({ node }) {
                const pathname = path.resolve(path.dirname(entryFile), node.source.value);
                console.log(pathname)
                dependencies[node.source.value] = pathname;
            }
        })
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        return {
            entryFile,
            dependencies,
            code
        }
    }
}