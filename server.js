const express = require("express");
const morgan = require("morgan");
const server = express();
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");

server.use("/api/users", userRouter);
server.use("/api/posts", postsRouter);
//custom middleware
server.use(morgan("combined"));
server.use(express.json());
// function logger(req, res, next) {}
server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});
module.exports = server;
