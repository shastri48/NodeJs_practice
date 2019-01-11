const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {        // request is an incoming message, ReadableStream
  const { method, url, headers } = req;                 // Node makes it easy to access the method and url


  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body, 'request body');
    res.statusCode = 200;

    res.setHeader('Content-Type', 'application/json'); 
    // res.setHeader('X-Powered-By', 'AltCampus');
    
    console.log(method, url, headers, res.headersSent);
    res.end(JSON.stringify(body));   
  });

  // response is a WriteableStream, 

  // res.write('<html>');
  // res.write('<body>');
  // res.write('<h1>Hello, World!</h1>');
  // res.write('</body>');
  // res.write('</html>');
  // res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// http.get('http://nodejs.org/dist/index.json', (res) => {
//   console.log(res.statusCode, res.writable, res.headers, res.data)

//   res.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`);
//   });
// });
