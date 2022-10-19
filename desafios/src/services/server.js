const express = require('express');
const mainRouter = require('../routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* app.use(express.static("public")); */

app.use('/api', mainRouter);

app.get('/', (req, res) => {
    res.json({
        msg: 'funciona la app en services/server'
    })
});

/* app.use((err, req, res, next) => {
    const status = err.status || 500;
    const messege = err.messege || 'severo error interno';

    res.status(status).json({
        messege,
    })
}) */

module.exports = app;