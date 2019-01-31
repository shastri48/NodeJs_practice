let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
var cookieParser = require('cookie-parser');
let ejs = require('ejs');




var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// app.use((request,response,next) => {
  //   console.log(Date());
  //   next();
  // });
  
  // app.get('/', (request, response) => {
  //   response.send('checking response')
  // })
  // app.post('/contact', (request, response) => {
  //   console.log(request.body);
  // })
  // app.get('/about', (request, response) => {
  //   response.sendFile('index.html');
  // })
app.get('/', (request, response) => {
  response.cookie("name","checkcookies");
  console.log(request.cookies);
  response.render('index', {title:"checkfile"});
})
app.get('/contact', (request, response) => {
  response.render('contact', {title:"checkfile"});
})
app.post('/data', (request, response) => {
  console.log(request.body);
  response.end(JSON.stringify(request.body));
})



app.listen(process.env.PORT || 4000, ()=>console.log("server running on port 4000"));

