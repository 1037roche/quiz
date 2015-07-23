//Get /quizes/question
exports.question = function(req , res)
{
	res.render('quizes/question', {pregunta:'Capital de Colombia'});
}

//Get /quizes/answer
exports.answer = function(req,res)
{
	if(req.query.respuesta === 'Bogota')
	{
		res.render('quizes/answer', {respuesta:'Correcto'});

	}else
	{
		res.render('quizes/answer', {respuesta:'Incorrecto'});
	}
}