// server.js


// set up
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path     = require('path');

var configDB = require('./config/database.js');

// configuration
// connect to our database
mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.configure(function(){
	// set up our express application
	app.use(express.logger('dev'));
	app.use(express.cookieParser()); //read cookies
	app.use(express.bodyParser()); // get information from the html

	app.set('view engine', 'jade');

	//required for passport
	app.use(express.session({ secret: 'davidlopena' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	// 
	app.set('port', process.env.PORT || 8000);
	// app.set('views', path.join(__dirname, 'views'));
	app.use(express.favicon());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('stylus').middleware(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));


});

// routes
// load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport);

// launch
app.listen(port);
console.log("Let's get it on! Here on port " + port);
