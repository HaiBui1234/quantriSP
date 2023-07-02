var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')

var session = require('express-session')
var API=require('./routes/api');
var Login=require('./routes/Login');
var home = require('./routes/index');
var usersRouter = require('./routes/User');
var SP =require('./routes/SanPham');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(methodOverride('_method'))

app.use(session({
  secret: 'NDFHnafidsfnadhf23nfsdhf23njNDFInn34djnfja',
  resave: true,
  saveUninitialized: true
  }))
 
app.use('/',Login);
app.use('/home', home);
app.use('/users', usersRouter);
app.use('/SP',SP);
app.use('/api',API);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(req.originalUrl.indexOf('/api')==0){
    res.json(
      {
        msg:err.message
      }
    );
  }else{
    res.render('error');
  }
 
});



module.exports = app;
