//Se importan los modelos para toda la logica asociada a  base de datos
var models = require('../models/models.js');

//Se defienen las acciones que tendra el controlador

/*
	@Nota
		 -La variable models tendra todo el modelo (transacciones a base de datos) que utilizara este controlador para su buen funcionamiento
*/

// Autoload - factoriza el codigo si ruta incluye :id
exports.load = function(req, res, next, id){

	models.Quiz.find(id).then(function(quiz)
	{
		if(quiz)
		{
			req.quiz = quiz;
			next();
		
		}else{next(new Error('No Existe el id = ' + id));}
	}

	).catch(function(error){next(error);});
}

//Get /quizes
exports.index = function(req , res){

	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	}
	).catch(function(error){next(error);});
}

//Get /quizes/:id
exports.show = function(req , res){
	
	res.render('quizes/show', {quiz:req.quiz});
}

//Get /quizes/:id/answer
exports.answer = function(req,res){		
	
	var respuesta = "Incorrecto";

	if(req.query.respuesta === req.quiz.respuesta)
	{
		respuesta = "Correcto";
	}

	res.render('quizes/answer', {quiz:req.quiz,respuesta:respuesta});
	
}