const express = require('express');
const http = require('http');
const path = require('path');
const mainRouter = require('../routes/index');
const ProductsController = require('../controller/productos');

const app = express();
const server = http.Server(app)

app.use(express.static('public'));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../../views');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    const data = ProductsController.getAll();
    res.render('index', { data });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', mainRouter);


module.exports = server;