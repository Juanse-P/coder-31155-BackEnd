const server = require("express").Router();

server.get("/", (req, res) => {
    return res.render("chat.hbs");
});

module.exports = server;
