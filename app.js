//Se importan los middleware
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var partials        = require('express-partials');

//Se llaman los enrutamientos
var routes          = require('./routes/index');

//Se genera la app express
var app             = express();

//Llama la ruta de vistas
app.set('views', path.join(__dirname, 'views'));
//Se llama el renderizador ejs
app.set('view engine', 'ejs');

//El partials sirve para generar el layout principal de app como el header, el footer y llamar el body respectivamente
app.use(partials());

//Se usan los middleware previamente importados
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/rubia.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Se configura las respuestas REST por medio del enrutador previamente invocado
app.use('/', routes);

//Se tratan los errores

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Se exporta la app generada
module.exports = app;