const path = require("path");
const fs = require("fs");
const dataPath = path.join(__dirname, "data");

fs.open(dataPath+'/'+'test.txt','a', (err, fd) => {
  if(err) console.log(err);
  fs.readFile(dataPath+'/'+'test.json', (err,data)=>{
    console.log(JSON.parse(data).users);
  })
  // fs.writeFile(fd,"hello", (err)=>{
  //   if(err)console.log(err)
  // })  
})