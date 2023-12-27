var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session =require('express-session')

var indexRouter = require('./routes/index');
var commentsRouter = require('./routes/comment');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Start a session
app.use(session({secret: 'secretsession' ,resave: false , saveUninitialized:false}));
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
});
app.use('/', indexRouter);
app.use('/comments', commentsRouter);

module.exports = app;
