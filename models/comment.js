//Defincion del modelo comentarios

module.exports = function(sequelize, DataTypes) {
  
  return sequelize.define(
           'Comment',
            { 
                texto:  {
                  type: DataTypes.STRING,
                  validate: { notEmpty: { msg: 'El campo Comentario no puede ir vacio' }}
                },

                publicado:  {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false
                }
        	  }
  );
}