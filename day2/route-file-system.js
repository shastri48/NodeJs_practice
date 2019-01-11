const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const dataPath = path.join(__dirname, "users");

// http.createServer((request, response)=>{
//   if(request.method == "POST" && request.url == "/users"){
//     let body = [];
//     request.on('data', (chunk) => {
//       body.push(chunk)
//     })
//     request.on('end', ()=>{
//       body = Buffer.concat(body).toString();
//       newbody = JSON.parse(body)
//       console.log(newbody);
//       response.end(body);
//     }) 
//   }
// }).listen(3000);

http.createServer((request, response) => {
  
  // GET method
  let parsedUrl = url.parse(request.url, true);
  let username = parsedUrl.query.username;
  if(request.method == 'GET' && parsedUrl.pathname == '/fetch'){
    fs.open(dataPath+"/"+username+ ".json",'r+', (err, fd)=>{
      if(err)console.log(err);
      fs.readFile(fd, (err,data)=> {
        if(err)console.log(err);
        console.log(data.toString());
        response.end(data);
      })
    })
  }

  // POST method
  if(request.method == 'POST' && request.url == '/users'){
    let body = [];
    request.on('data', (chunk)=> {
      console.log("chunk",chunk)
      body.push(chunk);
    }).on('end', ()=> {
      body = Buffer.concat(body).toString();
      let data = JSON.parse(body);
      console.log(data.name);
      response.end(body);
      fs.open(dataPath+'/'+data.name+'.json', 'ax', (err, fd)=>{
        if(err) console.log(err);
        fs.writeFile(fd, body , (err)=> {
          if(err)console.log(err);
        })
      })      
    })
  }

  // PUT method
  if(request.method == "PUT" && request.url == "/edit"){
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', ()=>{
      body = Buffer.concat(body).toString();
      newbody = JSON.parse(body);
      console.log(newbody.name);
      response.end(body);
      fs.open(dataPath+"/"+newbody.name+'.json', 'w', (err, fd)=>{
        if(err) console.log(err);
        fs.writeFile(fd, JSON.stringify(newbody), (err)=>{
          console.log(newbody)
          if(err)console.log(err);
        })
      })
    })
  }

  // DELETE method
  if(request.method == "DELETE" && request.url == "/delete"){
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      newbody = JSON.parse(body);
      console.log(newbody);
      response.end(body);
      fs.unlink(dataPath+"/"+newbody.name+".json", (err)=> {
        console.log(err);
      })
    })
  }

}).listen(3000);