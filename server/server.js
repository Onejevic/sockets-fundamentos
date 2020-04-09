const express = require('express'); //importo express es necesario utilizar npm
const socketIO = require('socket.io'); //importo socket.io es necesario utilizar el npm
const http = require('http'); //importo http ya que las peticiones express no son totalmente compatibles con socketio no es necesario npm
const path = require('path'); //importo path no es necesario el npm

const app = express(); //ejecuto el express

//creo el server mediante la variable http
//recordemos que express por debajo tambien está creando un servicio mediante http con varias caracteristicas particulares, por lo cual
//yo puedo mandarle por parámetro en el levantamiento del server la variable app para que contengan estas mismas características.
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public'); //creo la ruta de los valores estáticos por ejemplo el index.html
const port = process.env.PORT || 3000; //le indico bajo que puerto lo voy a usar

app.use(express.static(publicPath)); //los subo bajo el middleware los archivos estáticos

//inicializamos el socket de la siguiente manera mandando por parámetro el server. esto va a mantener una conexión directa
//con el servidor del backend
//acá hacemos un cambio ya que la variable io es necesario exportarla para poderle dar uso en el socket
module.exports.io = socketIO(server);
//posteriormente para que podamos usar el archivo lo requerimos, esto es una forma de modular todo el código.
require('./sockets/socket');


//por lo demas tambien ahora ya no ejecuto el app, sino directamente el server.
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});