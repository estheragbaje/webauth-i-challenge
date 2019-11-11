const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const userRouter = require("./users/user-router");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.send("<h3>Hello from Auth Challenge</h3>");
});

module.exports = server;
