const path = require("path");
const fs = require("fs");
const dataPath = path.join(__dirname, "data");

fs.open(dataPath+'/'+'test.txt','a', (err, fd) => {
  if(err) console.log(err);
  console.log(fd);
  fs.readFile(dataPath+'/'+'test.txt', (err,data)=>{
    console.log(data.toString());
  })
  // fs.writeFile(fd,"hello", (err)=>{
  //   if(err)console.log(err)
  // })  
})