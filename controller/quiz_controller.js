//Se importan los modelos para toda la logica asociada a  base de datos
var models = require('../models/models.js');

//Se defienen las acciones que tendra el controlador

/*
	@Nota
		 -La variable models tendra todo el modelo (transacciones a base de datos) que utilizara este controlador para su buen funcionamiento
*/

//Get /quizes
exports.index = function(req , res){

	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	});

}

//Get /quizes/:id
exports.show = function(req , res){

	models.Quiz.find(req.params.id).then(function(quiz){

		res.render('quizes/show', {quiz:quiz});
		
	});
}

//Get /quizes/:id/answer
exports.answer = function(req,res)
{
	models.Quiz.find(req.params.id).then(function(quiz){
		
		if(req.query.respuesta === quiz.respuesta)
		{
			res.render('quizes/answer', {quiz:quiz,respuesta:'Correcto'});

		}else
		{
			res.render('quizes/answer', {quiz:quiz,respuesta:'Incorrecto'});
		}	
	});	
}