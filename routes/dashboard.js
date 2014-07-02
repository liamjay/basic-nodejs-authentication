module.exports = function(app, passport) {

	// Load up the nerd model
	var Nerd = require('../models/nerd');


	// =====================================
	// DASHBOARD SECTION ===================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/dashboard', isLoggedIn, function(req, res) {
		Nerd.find(function(err, nerds) {
			if (err) console.error(err);
			res.render('dashboard/index', { user: req.user,  nerds: nerds }); // get the user out of session and pass to template
		});
	});

	app.get('/nerd/:id', function(req, res) {
		Nerd.findOne({ _id: req.params.id }, function(err, doc) {
			if (err) return console.error(err);
			res.render('dashboard/show', { nerd: doc });
		});
	});


	// =====================================
	// CREATE A NERD =======================
	// =====================================
	app.get('/store', function(req, res) {
		res.render('dashboard/create');
	});

	app.post('/store', function(req, res) {
		var newNerd = new Nerd({
			name: req.body.name,
			email: req.body.email,
			nerd_level: req.body.nerd_level
		});

		newNerd.save(function(err, nerd) {
			if (err) return console.error(err);
			res.redirect('/store');
		});
	});

	// =====================================
	// UPDATE A NERD =======================
	// =====================================
	app.get('/nerd/:id/edit', function(req, res) {
		Nerd.findOne({ _id: req.params.id }, function(err, doc) {
			if (err) return console.error(err);
			res.render('dashboard/edit', { nerd: doc });
		});
	});

	app.post('/nerd/:id/edit', function(req, res) {
		Nerd.update(
			{ _id: req.params.id },
			{
				name: req.body.name,
				email: req.body.email,
				nerd_level: req.body.nerd_level
			}, function(err, item) {
				if (err) return console.error(err);
				res.redirect('/dashboard');
			});
	});

	// =====================================
	// DELETE A NERD =======================
	// =====================================
	app.get('/nerd/:id/delete', function(req, res) {
		Nerd.remove({ _id: req.params.id}, function(err) {
			if (err) return console.error(err);
			res.redirect('/dashboard');
		});
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}