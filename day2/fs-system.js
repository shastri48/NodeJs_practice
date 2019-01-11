const path = require("path");
const fs = require("fs");
const dataPath = path.join(__dirname, "data");
// console.log(dataPath);

// fs.open(dataPath+'/'+'test.txt','a', (err, fd) => {
//   if(err) console.log(err);
//   fs.writeFile(fd,"hello", (err)=>{
//     if(err)console.log(err)
//   })  
// })


// fs.readFile(dataPath+'/'+'test.txt', (err, data)=>{
//   if(err)console.log(err);
//   else console.log(data.toString())
// })


// fs.open(dataPath+'/'+'test.txt', 'a', (err,fd)=>{
//   if(err)console.log(err);
//   fs.ftruncate(fd,0,(err)=>{
//     if(err)console.log(err)
//   })
// })

// fs.unlink(dataPath+'/'+'test.txt', (err)=>{
//   if(err)console.log(err);
// })