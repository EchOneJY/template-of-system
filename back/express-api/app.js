const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cookieParser());
app.use(session({
  secret: '11111',
  name: 'echonejy',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false,
}));

const indexRouter = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(__dirname));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//允许跨域访问
// app.all('*',function (req, res, next) {
// 	 res.header("Access-Control-Allow-Origin", "*");
// 	 res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
// 	 res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	 res.header('Access-Control-Allow-Headers', 'Content-Type');
// 	 next();
// });

module.exports = app;