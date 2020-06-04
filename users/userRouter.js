const express = require("express");

const router = express.Router();
const Users = require("./userDb");
const Posts = require("../posts/postDb");

//custom middleware

function validateUser(req, res, next) {
    // do your magic!
    if (!req.body) {
        res.status(400).json({ Error: "missing user data." });
    } else {
        if (!req.body.name) {
            res.status(400).json({ Error: "missing user name data." });
        } else next();
    }
}

function validatePost(req, res, next) {
    // do your magic!
    if (!req.body.text) {
        res.status(400).json({ Error: "missing required text field" });
    } else if (!req.body) {
        res.status(400).json({ Error: "missing post data" });
    } else next();
}
function validateUserId(req, res, next) {
    // do your magic!
    Users.getById(req.params.id)
        .then((user) => {
            if (user.name) {
                req.user = user;
                next();
            } else if (!user.name) {
                (error) => {
                    console.log(error);
                    res.status(400).json({ message: "invalid user id" });
                };
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error getting the specific user id",
            });
        });
}

router.post("/", validateUser, (req, res) => {
    // do your magic!
    let postUser = req.body;
    postUser.id = Date.now();
    Users.insert(postUser).then((user) => {
        res.status(201).json(user);
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
    // do your magic!//////////////////////////////////////////////////////////////
    let postPost = req.body;
    postPost.id = Date.now();
    Posts.insert({ user_id: req.params.id, ...req.body }).then((item) => {
        res.status(201).json({ item });
    });
});

router.get("/", (req, res) => {
    // do your magic!
    Users.get(req.query)
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({
                error: "cannot get the data you requested",
                err,
            });
        });
});

router.get("/:id", validateUserId, (req, res) => {
    // do your magic!
    if (req.user) {
        res.status(200).json(req.user);
    } else
        res.status(404).json({ error: "That User Id is not in the data base" });
});

router.get("/:id/posts", validateUserId, (req, res) => {
    // do your magic!
    if (req.user) {
        Users.getUserPosts(req.params.id).then((posts) => {
            res.status(200).json(posts);
        });
    } else res.status(404).json({ error: "Specified user id is not found" });
});

router.delete("/:id", validateUserId, (req, res) => {
    // do your magic!
    res.status(204).json({ message: "User was deleted." });
    Users.remove(req.params.id).then((number) => {
        res.status(204).json({ message: "User was deleted.", number });
    });
});

router.put("/:id", validateUserId, (req, res) => {
    // do your magic!
    req.body.id = req.params.id;
    Users.update(req.params.id, req.body).then(res.status(203).json(req.body));
});

module.exports = router;
