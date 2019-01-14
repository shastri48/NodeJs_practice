const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('querystring');
const dataPath = path.join(__dirname,'/portfolio/_site/');
console.log(dataPath);

// function writeData(path){

//   fs.readdir(path, (err,data)=>{
//     data.forEach(value=>{
//       let split = value.split(".")[1];
//       response.writeHead(200, {"Content-Type":`${mimetype[split]}`});
//       fs.createReadStream(path+value).pipe(response);
//     })
//   });
// }
let mimetype = {
  'html' : 'text/html',
  'jpg' : 'image/jpeg',
  'png' : 'image/png',
  'gif' : 'image/gif',
  'css' : 'text/css',
  'js' : 'text/javascript'
  }


http.createServer((request, response)=>{
  console.log(request.url);
  if(request.url == '/contact'){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(dataPath+"/contact/contact.html").pipe(response);
  }
  if(request.url == '/'){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(dataPath+"index.html").pipe(response);
  } else {
    for(key in mimetype){
      if(key == request.url.split(".")[1]){
        response.writeHead(200, { 'Content-Type': mimetype[key] });
        fs.createReadStream(dataPath+request.url).pipe(response);
      }
    }
  }


  if(request.url == '/data' && request.method == 'POST'){
    let body = "";
    request.on('data', (chunk) => {
      body += chunk.toString();
    }).on('end', () =>  {
      body = parse(body);
      console.log(body);
      // body = body.replace("&",",").replace("=",":").replace("%40","@")+"*******************";
      response.end(JSON.stringify(body));
      fs.open(dataPath + "data.txt", 'a+', (err,fd) => {
        fs.writeFile(fd, body, (err) => {
          console.log(err);
        })
      })
    })
  }
  // if(parsedUrl.pathname == '/assets/media/logo.png'){
  //   response.writeHead(200, {"Content-Type": "image/png"});
  //   fs.createReadStream(dataPath+"/assets/media/logo.png").pipe(response);
  // }
}
).listen(3000)