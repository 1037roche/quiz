//Defincion del modelo quiz
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
            { 
              pregunta:  {
            	type: DataTypes.STRING,
            	validate: { notEmpty: { msg: 'El campo pregunta no puede ir vacio' }}
        	  },
              respuesta: { 
              	type: DataTypes.STRING,
              	validate: { notEmpty: { msg: 'El campo respuesta no puede ir vacio' }}
              }
            
            });
}