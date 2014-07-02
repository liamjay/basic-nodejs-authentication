/*****************************************************
Set up
*****************************************************/
var express = require('express'),
http = require('http'),
path = require('path'),
mongoose = require('mongoose'),
passport = require('passport'),
flash = require('connect-flash'),
favicon = require('static-favicon'),
logger = require('morgan'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/test');

require('./config/passport')(passport); // pass passport for configuration

var app = express();

/*****************************************************
Configuration
*****************************************************/
if('development' == env) {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  
  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));


  // required for passport
  app.use(session({
    secret : 'ilovenodejs',
    maxAge: new Date(Date.now() + 3600000),
    expires: new Date(Date.now() + 3600000),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
}

/*****************************************************
Routes
*****************************************************/
require('./routes/login.js')(app, passport); // load our routes ans pass in our app and fully configured passport
require('./routes/dashboard.js')(app, passport);


/*****************************************************
Listen (start app with npm start)
*****************************************************/
http.createServer(app).listen(app.get('port'), function() {
   console.log("Server Listening on port " + app.get('port'));
});