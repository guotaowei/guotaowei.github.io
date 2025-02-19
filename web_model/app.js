var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer(function (request, response) {
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;

    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");

    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/html
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            // 根据文件扩展名设置正确的 Content-Type
            const ext = pathname.split('.').pop().toLowerCase();
            const contentTypes = {
                'js': 'application/javascript',
                'mjs': 'application/javascript',
                'html': 'text/html',
                'css': 'text/css',
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif'
            };
            const contentType = contentTypes[ext] || 'text/plain';

            // HTTP 状态码: 200 : OK
            response.writeHead(200, { 'Content-Type': contentType });

            // 响应文件内容
            response.write(data);
        }
        //  发送响应数据
        response.end();
    });
}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/index.html');