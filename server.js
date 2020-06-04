const express = require("express");

const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
const server = express();

var morgan = require("morgan");

server.use(morgan("combined"));
server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/posts", postsRouter);
server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//     var today = new Date();
//     var date =
//         today.getFullYear() +
//         "-" +
//         (today.getMonth() + 1) +
//         "-" +
//         today.getDate();
//     var time =
//         today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date + " " + time;
//     console.log(dateTime);
//     res && console.log(res);
//     req && console.log(req);
// }

module.exports = server;
