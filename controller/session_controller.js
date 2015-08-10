//Get /login Formulario login
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('session/new' , {errors: errors});
}

//Post /login se crea la session
exports.create = function(req, res){

	var login 		= req.body.login;
	var password 	= req.body.password;

	var userController = require('./user_controller');
	
	userController.autenticar(login, password, function(error, user){

		if(error){ // Si hay error retornamos error de session 
			req.session.errors = [{"message" : "Se ha producido un error " + error}];
			res.redirect("/login");
			return;
		}

		//Se crea req.session.user y guarda campos id y username
		//La session se define por la existencia de: req.session.user
		req.session.user = {id: user.id, username: user.username};

		res.redirect(req.session.redir.toString());//redirecciona path anterior al login
	});
}

//Delete /logout Destruye la session
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect("/quizes");
}