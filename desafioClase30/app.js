const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const passport = require('passport');
const path = require("path");
const parseArgs = require('minimist')


const cluster = require('cluster')
const os = require('os')

const { PORT, MODE } = parseArgs(process.argv.slice(2), { 
  alias: { 
    p: "PORT",
    m: "MODE",
  },
  default: { 
    PORT: 8080,
    MODE: "FORK",
  }
})

if (MODE === 'CLUSTER' && cluster.isPrimary) {
  const numCpus = os.cpus().length

  console.log('SERVIDOR MAESTRO DEL CLUSTER: ')
  console.log('Número de procesadores: ' + numCpus)
  console.log('PID:' + process.pid)

  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log('Worker ' + process.pid + ' exit')
    cluster.fork()
  })
} else {
  const app = express()
  const httpServer = new HttpServer(app)
  const io = new IOServer(httpServer)
  // ...
}



const router = require('./routes/router');
require('./middlewares/auth');

/* const PORT = process.env.port || 8080; */
const app = express();

const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 100000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(express.static('views'));
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');



const ApiChat = require("./controllers/apiChat.js");
const apiChat = new ApiChat();
let messages = [];

io.on("connection", async (socket) => {
  let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", (data) => {
    data.id = messages.length + 1
    messages.push(data);

    io.sockets.emit("messages", [data]);

    apiChat.writeChatToFile(messages);
  });
});

const server = httpserver.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGOATLAS);
  console.log(`Open server on port ${PORT} - PID(${process.pid}) - (${new Date().toLocaleString()})`);
});
server.on('error', err => console.log(`Error: ${err}`));