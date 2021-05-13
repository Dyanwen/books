const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
class KKB {
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        const serve = http.createServer((req, res) => {
            const ctx = this.createContext(req, res)
            this.callback(ctx);
            // 数据响应
            res.end(ctx.body)
        })
        serve.listen(...args)
    }
    use(callback) {
        this.callback = callback;
    }
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}
module.exports = KKB;