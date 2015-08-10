var users = {admin: {id: 1, username: "admin", password: "123"}};

// Comprueba si el usuario esta logeado en users
// Si autenticar falla o hay errores se ejecuta el callback(error)

exports.autenticar = function (login, password, callback) {
	
	if(users[login])
	{
		if(users[login].password === password)
			callback(null, users[login]);
		else
			callback(new Error("Password Erróneo"));

	}else
		callback(new Error("No existe el usuario"));

} 