
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

                require('./src/index.js');

            })({"./src/index.js":{"dependencies":{"./a.js":"/Users/gongxi/Desktop/20/webpack05/src/a.js","./b.js":"/Users/gongxi/Desktop/20/webpack05/src/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nvar _b = require(\"./b.js\");\n\n/**\n * 分析入口模块\n * 内容：依赖模块\n * 内容：借助babel处理代码生成代码片段\n */\nconsole.log(_a.str);\nconsole.log(_b.str2);"},"/Users/gongxi/Desktop/20/webpack05/src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.str = void 0;\nvar str = 333;\nexports.str = str;"},"/Users/gongxi/Desktop/20/webpack05/src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.str2 = void 0;\nvar str2 = \"344\";\nexports.str2 = str2;"}})