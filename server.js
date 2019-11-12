const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express();
const userRouter = require("./users/user-router");

const sessionConfig = {
  name: "apple",
  secret: "make this long and keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 2,
    secure: false,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("./db-config"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.send("<h3>Hello from Auth Challenge</h3>");
});

module.exports = server;
