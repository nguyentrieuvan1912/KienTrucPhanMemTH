const http = require('http');

http.createServer((req, res) => {
    res.write('Hello, Docker!');
    res.end();
}).listen(3000, () => {
    console.log('Server is running on port 3000');
});
