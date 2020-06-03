const express = require("express");
const morgan = require("morgan");
const server = express();

const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");

server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use(morgan("combined"));
server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/posts", postsRouter);
//custom middleware

// function logger(req, res, next) {}

module.exports = server;
