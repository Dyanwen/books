const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    console.log(`loading ${ctx.url} ${parseInt(end - start)}`);
})

app.use(async ctx => {
    ctx.body = 'Hello World';
})

app.listen(3000);