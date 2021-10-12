const { promisify } = require('util')
const figlet = promisify(require('figlet'));
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./download.js')
const log = (content) => {
    console.log(chalk.green(content));
}
const spawn = async (...agrs) => {
    const { spawn } = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...agrs);
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    //print welecome page
    clear()
    const data = await figlet(`${name}`);
    log(data)

    //print init
    log(`创建项目`)
    // await clone('github:vuejs/vue', name)

    // npm i
    log('安装依赖')
    await spawn('npm', ['install'], { cwd: `./${name}` })
    log(chalk.green(
        `
        to get start:
        =========================
            cd ${name}
            npm run serve
        =========================
        `
    ))
    const open = require('open');
    open(`http://localhost:8080`);
    await spawn('npm', ['run', 'serve'], { cwd: './${name}' })
}
