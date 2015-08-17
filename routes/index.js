//Siempre se debe de importar express
var express = require('express');
//Se invoca la funcion de enrutamiento
var router  = express.Router();
//Se importan los controladores
var quizController 		= require('../controller/quiz_controller');
var commentController 	= require('../controller/comment_controller');
var sessionController	= require('../controller/session_controller');

//Se define la vista cuando la respuesta REST es /
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :id
router.param('id' 								, quizController.load); 		// autoload :id
router.param('commentId' 						, commentController.load); 		// autoload :commentId

//Definicion de rutas de session
router.get('/login'								, sessionController.new);		//Formulario de login
router.post('/login'							, sessionController.create);	//Crear session
router.get('/lagout'							, sessionController.destroy);	//Destruir session

//Se definen las vista apropiadas para cada repuestas REST
router.get('/quizes'							, quizController.index);
router.get('/quizes/:id(\\d+)'					, quizController.show);
router.get('/quizes/:id(\\d+)/answer'			, quizController.answer);

router.get('/quizes/new'						, sessionController.loginRequired , quizController.new);
router.post('/quizes/create'		    		, sessionController.loginRequired , quizController.create);
router.get('/quizes/:id(\\d+)/edit'				, sessionController.loginRequired , quizController.edit);
router.put('/quizes/:id(\\d+)'					, sessionController.loginRequired , quizController.update);
router.delete('/quizes/:id(\\d+)'				, sessionController.loginRequired , quizController.destroy);

router.get('/quizes/:id(\\d+)/comments/new'		, commentController.new);
router.post('/quizes/:id(\\d+)/comments'		, commentController.create);
router.get('/quizes/:id(\\d+)/comments/:commentId(\\d+)/publish'	,sessionController.loginRequired , commentController.publish);

//Se exportan el router para ser previamente utilizado
module.exports = router;