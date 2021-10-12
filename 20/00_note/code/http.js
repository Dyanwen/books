const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    const { url, method, headers } = request;
    if (url === '/' && method === 'GET') {
        fs.readFile('./page1.html', (err, data) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain,charset=utf-8'
                })
                response.end('500 服务器异常')
                return
            }
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html")
            response.end(data);
        })
    } else if (method === 'GET' && headers.accept.indexOf('image/*') > -1) {
        fs.createReadStream('.' + url).pipe(response)
    }
    else {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain,charset=utf-8')
        response.end('404');
    }
}).listen(8080, () => {
    console.log('listening on 8080')
})


function getPrototypeChain(obj) {
    let prototypeChain = [];
    while (obj = Object.getPrototypeOf(obj)) {
        prototypeChain.push(obj);

    }
    return prototypeChain;
}