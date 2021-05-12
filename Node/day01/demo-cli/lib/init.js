const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./download')
const log = content => console.log(chalk.green(content))

const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    // 打印欢迎界面
    clear()
    const data = await figlet('KKB welcome')
    log(data)
    log(`创建项目:${name}`)
    // 初始化
    await clone('github:su37josephxia/vue-template', name)
    // 安装依赖
    log(`安装依赖...`)
    await spawn('npm', ['install'], { cwd: `./${name}` })
    log(chalk.green(`
        安装完成：
        To Get Start：
        =================
            cd ${name}
            npm run serve
        =================
    `))
    const open = require("open");
    open('http://localhost:8081')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })

}
