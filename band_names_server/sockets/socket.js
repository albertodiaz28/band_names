const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band( 'Platero y tu' ));
bands.addBand(new Band( 'Non Servium' ));
bands.addBand(new Band( 'Marea' ));
bands.addBand(new Band( 'Sabina' ));

console.log(bands);


//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje!!!', payload.nombre );

        io.emit('mensaje', {admin: 'Nuevo mensaje' });
    });

    //client.on('emitir-mensaje', ( payload ) => {
    ///    io.emit('nuevo-mensaje', payload);
    //});

    client.on('vote-band', (payload) => {
        bands.votBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {
        bands.addBand( new Band(payload.name));
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

});