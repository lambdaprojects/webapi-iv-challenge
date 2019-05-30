const express = require("express");

const databaseRouter = require("./posts/db_router.js");

const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("    <h2>Lambda Chat API</h2><p>Welcome to the chat API</p>");
});

server.use("/api/posts", databaseRouter);

module.exports = server;
