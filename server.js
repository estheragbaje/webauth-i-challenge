const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const server = express();
const userRouter = require("./users/user-router");

const sessionConfig = {
  name: "apple",
  secret: "make this long and keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false
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
