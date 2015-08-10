//Se importan los modelos para toda la logica asociada a  base de datos
var models = require('../models/models.js');

//Get /quizes/:idquiz/comments/new 
exports.new = function(req, res){

	res.render('comments/new.ejs' , {quizid: req.params.id, errors: []});
}

//Get /quizes/:idquiz/comments
exports.create = function(req, res){

	var comments = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.id
	});

	comments.save().then(function(){ 
		res.redirect('/quizes/'+req.params.id); 
	}).catch(function(error){next(error);});

}