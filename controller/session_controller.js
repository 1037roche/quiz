

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
		var dDate = new Date();
		req.session.user = {id: user.id, username: user.username, minutos: dDate.getMinutes()};

		res.redirect(req.session.redir.toString());//redirecciona path anterior al login
	});
}
	
//Delete /logout Destruye la session
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect("/quizes");
}

//MW de Autorizacion de accesos HTTP registrados
exports.loginRequired = function(req, res, next){
	
	if(req.session.user)
		next();
	else
		res.redirect('/login');
}

//Validar que la session no halla caducado
exports.validarTimeSession = function(req, res)
{
	if(req.session.user)
	{		
		var dDate = new Date();
		var dMinutosSumados = req.session.user.minutos + 2;

		if(dDate.getMinutes() >= dMinutosSumados)
		{
			delete req.session.user; 
			res.redirect('/login');
		}
		else
		{
			req.session.user.minutos = dDate.getMinutes();
		}
		
	}
}