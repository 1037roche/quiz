var express = require('express');
var router  = express.Router();

var quizController = require('../controller/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Primera Pregunta' });
});

router.get('/quizes/question'	, quizController.question);
router.get('/quizes/answer'		, quizController.answer);

module.exports = router;
