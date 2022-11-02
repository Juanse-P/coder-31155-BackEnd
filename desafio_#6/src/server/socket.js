const socketIo = require('socket.io');
const path = require('path');
const { formatMessages } = require('../utils/messages');
const ProductsController = require('../controller/productos')
const messageObj = require('../controller/message');

const MessagesFileFolderPath = path.resolve(__dirname, "../../messages.json");

messageObj.fileName = MessagesFileFolderPath;

const productData = {
    title: undefined,
    value: undefined,
    thumbnail: undefined,
};

let io;

const initServer = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Un nuevo usuario se ha conectado');

        socket.on('NewConnection', async () => {
            socket.emit('welcome', 'bienvenido!!!');
        });


        socket.on('addProduct', (newProduct) => {
            productData.titulo = newProduct.titulo;
            productData.precio = newProduct.precio;
            productData.imagen = newProduct.imagen;
            ProductsController.save(productData);
            io.emit('lastProduct', ProductsController.productos[ProductsController.productos.length - 1]);
        })


        socket.on("sendMessage", async (message) => {
            io.emit("lastMessage", formatMessages(message));

            try {
                let exist = await messageObj.validaFile();
                if (exist) {
                    console.log("El arcico ya existe y se esta guardando el mensaje");
                }
                await messageObj.saveMessage(formatMessages(message));
            } catch (error) {
                console.log(error);
            }
        });
    });
    return io;
}

const getWsServer = () => {
    return io;
}

module.exports = {
    initServer,
    getWsServer,
};