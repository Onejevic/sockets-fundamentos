//io es una función que aparece gracias a la importación que acabamos de hacer en la parte superior, este viene siendo casi
//el mismo objeto declarado bajo el servidor y que nos servirá para hacer una conexión activo activo.
var socket = io();

//-------------------------------------------------------------------------------------------------
//el método ON sirve para escuchar
//el método EMIT sirve para emitir
//-------------------------------------------------------------------------------------------------

//esto determinará que estoy conectandome al servidor y tengo una conexión activo activo, si por el contrario
//tumbara el servidor, el socket intentará hasta un cierto tiempo tratar de volver a establecer la conexión.
//para el ejemplo solo arrojo un mensaje en consola indicando que estoy conectado al servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//con esta función podemos saber cuando se pierde la conexión con el servidor (cuando se apaga el server por ejemplo).
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//Con la función emit podemos emitir mensajes al servidor, tengo que enviarle por parámetro una llave o valor para identificarlo
//el segundo parámetro es el mensaje que quiero enviar, para el ejemplo envío un objeto.
//y el tercero es una función que recibe por parámetro un mensaje (que no sabemos por el momento que enviará por que el servidor
//es el encargado de proveer este mensaje) y lo mostrará por consola
socket.emit('enviarMensaje', {
    usuario: 'john',
    mensaje: 'hola mundo'
}, function(mensaje) {
    console.log(mensaje);
});

//con esta función escuchamos al servidor de acuerdo a la llave que haya escrito al lado del servidor
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
})