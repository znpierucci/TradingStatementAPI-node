const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write("hello world");
        res.end();
    }
    
    if(req.url === '/api/courses') {
        res.write("courses");
        res.end();
    }
});

