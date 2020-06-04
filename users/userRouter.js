const express = require("express");

const router = express.Router();
const Users = require("./userDb");

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
            res.status(500).json({ message: "Error getting users", error });
        });
}

router.post("/", validateUser, (req, res) => {
    // do your magic!
    let postUser = req.body;
    postUser.id = Date.now();
    res.status(201).json(postUser);
});

router.post("/:id/posts", validatePost, (req, res) => {
    // do your magic!
    let postPost = req.body;
    postPost.id = Date.now();

    Users.insert(postPost).then((post) => {
        res.status(201).json(post);
    });
    // res.status(201).json(postPost);
});

router.get("/", (req, res) => {
    // do your magic!
    Users.get(req.query)
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({
                error: "",
                err,
            });
        });
});

router.get("/:id", validateUserId, (req, res) => {
    // do your magic!
    if (req.user !== "") {
        res.status(200).json(req.user);
    } else
        res.status(404).json({ error: "That User Id is not in the data base" });
});

router.get("/:id/posts", validateUserId, (req, res) => {
    // do your magic!
    Users.getUserPosts(req.params.id).then((posts) => {
        res.status(200).json(posts);
    });
});

router.delete("/:id", (req, res) => {
    // do your magic!
});

router.put("/:id", (req, res) => {
    // do your magic!
});

module.exports = router;
