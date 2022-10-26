const Server = require('./services/server');

const puerto = 8080;
Server.listen(puerto, () => 
    console.log(`El servidor esta listo y funcionando en el puerto`, puerto)
);

/* Server.on('error', (error) => {
    console.log(`Error en el servidor -->  ${error}`);
});
 */