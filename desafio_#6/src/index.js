const server = require('./server/server');
const { initServer, getWsServer } = require('./server/socket')

const PORT = 8080;

const init = async () => {
    initServer(server);
    server.listen(PORT, () => {
        console.log(`el server esta encendido y funcionando en el puerto ${PORT}`);
    })
}

init();

/* server.listen(PORT, () => {
    console.log(`El server esta encendido y funcionando en el puerto ${PORT}`);
}); */