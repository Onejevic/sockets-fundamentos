//importamos el objeto que exporta directamente el archivo server.js
const { io } = require('../server')
    //-------------------------------------------------------------------------------------------------
    //el método ON sirve para escuchar
    //el método EMIT sirve para emitir
    //-------------------------------------------------------------------------------------------------
    //de la misma manera si yo quiero saber quien se conecta a mi servidor puedo hacerlo con el método on, este recibe por parámetro
    //un string llamado connection, y una función; en la función se manda por parámetro el cliente, que con esta variable podré obtener mucha
    //información de quien se está conectando, por lo tanto tengo una conexión activo activo en ambos lugares recibiendo respuesta tanto al lado de la consola
    //del servidor como la consola del cliente.
io.on('connection', (client) => {
    console.log('Usuario conectado');

    //de la misma manera si quiero detectar en mi servidor cuando un usuario se desconecta
    //puedo hacerlo mediante el cliente con el método on, dentro de este especifico el parámetro
    //disconnect donde en la función mando un mensaje en consola.
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //con esta función escuchamos el cliente de acuerdo a la llave que haya escrito al lado del cliente, en la función recibo dos parámetros
    //el primero es el mensaje que me envía el cliente
    //en este callback lo ejecuto con un if pero enviando mensajes alternativos si el usuario viene o nó.
    client.on('enviarMensaje', (data, callback) => {
        console.log('Cliente', data);

        //el broadcast y el emit sirve para enviar un mensaje a todos los clientes o usuarios que estén conectados
        client.broadcast.emit('enviarMensaje', data);


        // ejecuto el callback recibido por el cliente
        // if (mensaje.usuario) {
        //     callback({ resp: 'TODO SALIÓ BIEN' });
        // } else {
        //     callback({ resp: 'TODO SALIÓ MAL' });
        // }
    })

    //Con la función emit podemos emitir mensajes al cliente, tengo que enviarle por parámetro una llave o valor para identificarlo
    //y el segundo es el mensaje que quiero enviar, para el ejemplo envío un objeto.
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });
});