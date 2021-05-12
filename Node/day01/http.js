// const fs = require("fs");
// const txt = fs.readFileSync('./config.js');
// console.log(txt.toString())


// const fs = require("fs");
// fs.readFile('./config.js', (err, data) => {
//     if (err) {
//         throw err
//     }
//     console.log(data.toString())
// })

// (async () => {
//     const fs = require("fs");
//     const { promisify } = require("util");
//     const readFile = promisify(fs.readFile);
//     const txt = await readFile('./config.js');
//     console.log(txt.toString())
// })()

// process.nextTick(async () => {

// })

/**
 * buffer-用于在 tcp 流，文件系统操作，以及其他上下文中与八位字节流进行交互，
 * 八位字节组成的数组，可以有效的在 js 中存储二进制数据
 */

const fs = require("fs");
const http = require("http");
const server = http.createServer((req, res) => {
    const { url, method, headers } = req;
    // console.log('end', getPrototypeChain(res))
    // res.end('hello world');
    if (url == '/' && method == 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain;charset="utf-8"' })
                res.end('服务器异常')
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    } else if (url == '/uses' && method == 'GET') {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            name: 'zhangsn',
            age: 23
        }))
    } else if (method == 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(res)
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain;charset="utf-8"' })
        res.end('请求的url不存在')
    }
}, 1000)

function getPrototypeChain(obj) {
    const protoChain = [];
    while (obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj);
    }
    return protoChain;
}

server.listen(3000, () => {
    console.log('server is start at 3000')
})

