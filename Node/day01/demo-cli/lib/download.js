const { promisify } = require('util')
module.exports.clone = async function (repo, desc) {
    const download = promisify(require("download-git-repo"));
    const ora = require("ora");//状态提示
    const process = ora(`下载.....${repo}`)
    process.start()
    await download(repo, desc)
    process.succeed()
}