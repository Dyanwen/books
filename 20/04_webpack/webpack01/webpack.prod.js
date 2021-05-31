const path = require("path");
module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        fileName: 'index.js'
    }
}