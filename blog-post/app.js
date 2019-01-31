var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash-plus');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var slug = require('slug');

// connecting mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, 
  (err)=>console.log("connected to mongodb"));


require('./models/Posts');
require('./models/Comment');
require('./models/User');
require('./models/Tags');
require('./models/Post-tag.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRegister = require('./routes/register');
var postsRouter = require('./routes/posts');
var apisRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'altcampus cookies',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', usersRegister);
app.use('/posts', postsRouter);
app.use('/api/v1', apisRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(port, () => {
//   console.log('listening in app at 3000');
// });

module.exports = app;
