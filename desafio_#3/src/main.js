const express = require('express');
const Contenedor = require('../../desafio_#2/index.js');

const puerto = 8080;
const app = express();

const server = app.listen(puerto, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${puerto}`);
})
server.on('error', (err) =>{
    console.log('Ocurrio un error en el servidor ->', err);
})

const productos = new Contenedor('D:/coder-32155-backEnd/desafio_#3/src/productos.json');

app.get('/productos', async (req, res) =>{
    const muestraProdu = await productos.getAll();
    res.send(muestraProdu);
})

app.get('/productoRandom', async (req, res) =>{
    const produ = await productos.getAll();
    const numeroRandom = Math.floor(Math.random() * produ.length);
    res.send(produ[numeroRandom]);
})
