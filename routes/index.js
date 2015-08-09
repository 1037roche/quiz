//Siempre se debe de importar express
var express = require('express');
//Se invoca la funcion de enrutamiento
var router  = express.Router();
//Se importan los controladores
var quizController = require('../controller/quiz_controller');

//Se define la vista cuando la respuesta REST es /
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :id
router.param('id' , quizController.load); // autoload :id

//Se definen las vista apropiadas para cada repuestas REST
router.get('/quizes'					, quizController.index);
router.get('/quizes/:id(\\d+)'			, quizController.show);
router.get('/quizes/:id(\\d+)/answer'	, quizController.answer);
router.get('/quizes/new'				, quizController.new);
router.post('/quizes/create'		    , quizController.create);
router.get('/quizes/:id(\\d+)/edit'		, quizController.edit);
router.put('/quizes/:id(\\d+)'			, quizController.update);
router.delete('/quizes/:id(\\d+)'		, quizController.destroy);

//Se exportan el router para ser previamente utilizado
module.exports = router;