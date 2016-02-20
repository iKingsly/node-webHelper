var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http =  require('http')
var util =  require('util')
var Result =  require('./sys/entity/result.js');
var config =  require('./sys/config/Config.js');
var StringUtil =  require('./sys/util/StringUtil.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//统一配置拦截器
app.get(/^\/server\/([A-Z,a-z,0-9])+!([A-Z,a-z,0-9])+$/,function(req,res){
      var url =  req.url;
      var actionName = StringUtil.getActionName(url);
      var methodName = StringUtil.getMethodName(url);
      var action = require(config[actionName]);
      if(util.isFunction(action[methodName])){
            action[methodName](req,res,req.query);
      }
      else{
          var result = new Result();
          result.configError(actionName+"类或"+methodName+"方法未实现!!!");
          res.send(result);
      } 
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  var result = new Result();
  result.success = 'FALSE';
  result.message="亲，链接失效了，请稍后重试";
  res.send(result);
 
 // err.status = 404;
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(3000,function(req,res){
  console.info("start the server!!!");
});
module.exports = app;