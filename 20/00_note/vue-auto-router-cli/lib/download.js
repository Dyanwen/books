const { promisify } = require('util')

module.exports.clone = async function (repo, desc) {
    const download = promisify(require('download-git-repo'))
    const ora = await (async () => {
        return await import('ora');
    })();
    const process = ora.default(`download ${repo}`)

    process.start()
    await download(repo, desc)
    process.succeed()
}