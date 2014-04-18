// The routes

module.exports = function(app, passport) {

	// Home page
	app.get('/', function(req, res) {
		//if the user is logged in send this view
		if(req.isAuthenticated()) {
			res.render('isloggedin/index', {
			 title: 'Express',
			 pathname: '/' 
			});
		} else {
			res.render('index', {
			 title: 'Express',
			 pathname: '/' 
			});
		}
	});

	// Shows the login form

	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login', { 
			pathname: '/login', 
			message: req.flash('loginMessage')
		});
	});

	// process the login form
		app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	// Signup - show the form

	app.get('/signup', function(req, res) {
		res.render('signup', {
			pathname: '/signup',
			message: req.flash('loginMessage')
		});
	});

	// Process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	// Profile Section

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile',{
			pathname: '/profile',
			user: req.user
		});
	});

	// Logout

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in 

function isLoggedIn(req, res, next) {
	// If user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// otherwise
	res.redirect('/');
}