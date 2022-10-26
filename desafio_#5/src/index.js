const server = require('./services/server');

const puerto = 8080;

server.listen(puerto, () => {
    console.log(`El server ya esta funcionando en el puerto ${puerto}`);
})