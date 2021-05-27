const config = require("./webpack.config.js");
const webpack = require("./lib/webpack.js");

new webpack(config).run()