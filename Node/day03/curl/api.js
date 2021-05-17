const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const { method, url } = req;
    // console.log(`${method}, ${url}`)
    // console.log(`cookie=${req.headers.cookie}`)
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    if (method == "GET" && url == '/') {
        fs.readFile('./index.html', (err, data) => {
            res.setHeader("Content-Type", "text/html")
            res.end(data);
        })
    } else if (method == "OPTIONS" && url == '/api/getJson') {

        // res.writeHead(200, {
        //     "Access-Control-Allow-Origin": "http://localhost:3000",
        //     "Access-Control-Allow-Headers": "X-Token,Content-Type",
        //     "Access-Control-Allow-Methods": "PUT"
        // })
        res.end();
    } else if (method == "GET" && url == '/api/getJson') {

        // res.setHeader("Content-Type", "application/json")
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.setHeader('Set-Cookie', 'a=222')
        res.end(JSON.stringify({ name: "zhangsan" }))
    } else if (method == "POST" && url == '/api/save') {
        let retData = [];
        let size = 0;
        req.on('data', (data) => {
            retData.push(data);
            size += data.length;
        })
        req.on('end', _ => {
            const data = Buffer.concat(retData, size);
            console.log(data.toString())
            res.end(`formdate:${data.toString()}`)
        })
    }
}).listen(4000)