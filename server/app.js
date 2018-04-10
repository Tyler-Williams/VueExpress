const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const mongoose = require('mongoose')
const seeder = require('./routes/seeder/products')
const cors = require('cors')

const app = express();

//  Set up mongo DB connection
const mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB)

//  Get Mongoose to use Global promise library
mongoose.Promise = global.Promise

//  Get Mongoose connection
const db = mongoose.connection

//  Bind mongoose connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use(cors())

//  SEEDER
app.use('/seeder', seeder)

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
  res.render('error');
});

module.exports = app;
