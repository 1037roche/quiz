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

//Get /quizes/create
exports.create = function(req, res){

	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(

		function(err)
		{
			res.render('/quizes/new', {quiz: quiz, errors: err.errors});

		}else
		{
			//Guarda en la BD los campos pregunta y respuesta de quiz
			quiz.save({fields: ["pregunta", "respuesta"] }).then(function(){		
				res.redirect('/quizes');//Redirecciona  HTTP (URL relativo) lista de preguntas
			});	
		}
	);
}

//Get /quizes/new 
exports.new = function(req, res){
						//crea objeto quiz
	var quiz = models.Quiz.build({pregunta: 'Pregunta', respuesta: 'Respuesta'});
	res.render('quizes/new' , {quiz: quiz});
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

//Get /quizes/:id/edit
exports.edit = function(req,res){		
	
	var quiz = req.quiz;

	res.render('quizes/edit', {quiz:quiz, errors: []});

}

//Put /quizes/:id
exports.update = function(req,res){		
	
	req.quiz.pregunta  = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.save({fields:["pregunta", "respuesta"]}).then(function(){res.redirect('/quizes');});
}
