const express = require('express');
const router = require('../routes/rutas');
const path = require('path')

const app = express();

app.use(express.static('public'));

const viewsForlderPath = path.resolve(__dirname, '../../views');

app.set('view engine', 'ejs');
app.set('views', viewsForlderPath)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

module.exports = app;