var path = require('path');

//Postgres DATABASE_URL = postgres://user:password@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/

var url         = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user 		= (url[2]||null);
var pwd 		= (url[3]||null);
var protocolo 	= (url[1]||null);
var dialect 	= (url[1]||null);
var port 		= (url[5]||null);
var host 		= (url[4]||null);
var storage 	= process.env.DATABASE_STORAGE;

//Carga modelo ORM
var Sequelize = require('sequelize');

//Usa BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd, 
						{
							dialect	 : dialect, 
							protocol :protocolo,
							port 	 :port,
							host 	 :host,
							storage  :storage, //Solo para SQLite (.env)
							omitNull :true //Solo Postgres
						}	
);

//Importa la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;//Definicion de la tabla Quiz
// sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().success(function(){
//success(..) ejecuta el manejador una vez creada la tabla
Quiz.count().success(function(count){
	if(count === 0){//La tabla se inicializa solo si esta creada
		Quiz.create({

			pregunta:"Capital de Casa sola",
			respuesta:"Que le importa"

		}).success(function(){console.log("Base de datos inicializada")});
	}
});
});