const router = require('express').Router();
const passport = require('passport');
const Contenedor = require('../class/contenedir');
const { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute } = require('../controllers/controller');
const path = require('path')
const checkAuthentication = require('../middlewares/auth');
const { fork } = require("child_process");
const productos = new Contenedor(path.join(__dirname, '../data/productos.json'));
const os = require('os')

// Index
router.get('/', getLogin)
router.get('/productos', (req, res) => {
    if (req.isAuthenticated()) {
        let content = productos.content;
        let boolean = content.length !== 0;
        let { username } = req.user;
        res.render('index.handlebars',
            {
                list: content,
                showList: boolean,
                username: username,
            });
    } else {
        res.render('login.handlebars');
    }
});
router.post('/productos', (req, res) => {
    if (req.isAuthenticated()) {
        productos.save(req.body);
        let content = productos.content;
        let boolean = content.length !== 0;
        let { username } = req.user;
        res.render('index.handlebars',
            {
                list: content,
                showList: boolean,
                username: username,
            });
    } else {
        res.render('login.handlebars');
    }
});
router.get('/chat', (req, res) => {
    if (req.isAuthenticated()) {
        let { username } = req.user;
        res.render('chat.handlebars',
            {
                username: username,
            });
    } else {
        res.render('login.handlebars');
    }
})
/* 
let { username } = req.user;
    res.render('form.handlebars',
        {
            list: content,
            showList: boolean,
            username: username,
        });
}
*/

// Login
router.get('/login', getLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), getIndex);
router.get('/faillogin', getFailLogin);

// Signup
router.get('/signup', getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignup);
router.get('/failsignup', getFailSignup);

// Redirect to login & signup
router.post('/redirect-signup', (req, res) => res.redirect('/signup'));
router.post('/redirect-login', (req, res) => res.redirect('/login'));

// Logout
router.post('/logout', getLogout);

// Fail route
/* router.get('*', failRoute); */

router.get("/info", (req, res) => {
    res.json({
        'Argumentos de entrada': process.argv.slice(2),
        'Nombre de la plataforma (sistema operativo)': process.platform,
        'Versión de node.js': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().rss,
        'Path de ejecución': process.argv.slice(0),
        'Proccess id': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Número de procesadores': os.cpus().length,
    })
});

router.get('/api/randoms'/* la ruta debe ser  como = 'http://localhost:8080/api/randoms?cantidad=200' */, (req, res) => {
    const forked = fork('./controllers/random.js');

    let { cantidad } = req.query;
    let obj = {};
    cantidad
        ? forked.send({ cantidad, obj })
        : forked.send({ cantidad: 500000000, obj });
    forked.on('message', msg => res.json(msg));
});

router.get('*', failRoute);

module.exports = router;
