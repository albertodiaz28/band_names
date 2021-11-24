const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


const publicPath = path.resolve( __dirname, 'public' );

app.use( express.static( publicPath ) );

//Abrir puerto 3001 de las variables de entorno para escuchar
server.listen( process.env.PORT, (err) => {
    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});