var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js'     	: 'text/javascript',
	'.html'   	: 'text/html',
	'.css'		: 'text/css'
};

var cache = {};
function cacheYentrega(f,cb) {
	fs.stat(f, function(err, stats){
		var ultimoCambio = Date.parse(stats.ctime);
		var estaActualizado = (cache[f]) && ultimoCambio > cache[f].timestamp;

		if (!cache[f] || estaActualizado){
			fs.readFile(f, function(err, data){
			console.log('Cargando '+f+'desde archivo');
			if (!err){
				cache[f] ={ content: data,
							timestamp: Date.now() //Almacena datos tiempo actual
						};
			}
			cb(err, data);
	});
	return;
	}
	console.log('Cargando '+ f +' de cache');
	cb(null, cache[f].content);
	}); //Final de fs.stat
}

http.createServer(function (request, response){

	var buscar = decodeURI(request.url);
	if (path.dirname(buscar) === '/'){ buscar='menu2.html'}

	var	f = path.join(__dirname,'/public/'+ buscar);
	
	console.log(buscar);
	console.log(f);
	
	fs.access(f, fs.F_OK, function(err){
		if (err){
			console.log(err ? 'no access!' : 'can read/write');
			response.writeHead(404);
			response.end("No se ha encontrado el fichero");
			return;
		}

	
		cacheYentrega(f, function(err, data){
			if (err){
				response.writeHead(500);
				response.end('Error del Servidor');
				return;
				}
			var headers = {'Content-type': mimeTypes[path.extname(buscar)]};
			response.writeHead(200, headers);
			response.end(data);
		});
	});	
}).listen(process.env.PORT ||8080);
