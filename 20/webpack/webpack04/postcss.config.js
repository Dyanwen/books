module.exports = {
    plugins: [
        require('autoprefixer')({
            // 所有主流浏览器的最近两个版本，兼容市场占有率大于1%的浏览器（全世界）
            // overrideBrowserslist: ["last 2 versions", ">1%"]
        })
    ]
}