// const http = require("http");
// const server = http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello world')
// })
// server.listen(3000, () => {
//     console.log('app listening on 3000')
// })

const http = require("http");
const KKB = require("./kkb");
// const gs = require("./test-getter-setter");
const app = new KKB();

app.use(async (ctx) => {
    ctx.res.writeHead(200);
    ctx.body = 'hello world1'

})
app.listen(3000, () => {
    console.log('app listening on 3000')
})
