const express = require("express");

const router = express.Router();
const Users = require("./userDb");

function validateUserId(req, res, next) {
    // do your magic!
    Users.getById(req.params.id)
        .then((user) => {
            if (req.params.id) {
                req.user = user;
                next();
            } else {
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

router.post("/", (req, res) => {
    // do your magic!
});

router.post("/:id/posts", (req, res) => {
    // do your magic!
});

router.get("/", (req, res) => {
    // do your magic!
    Users.get().then((Users) => {
        res.status(200).json({ Users });
    });
});

router.get("/:id", validateUserId, (req, res) => {
    // do your magic!
    res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
    // do your magic!
});

router.delete("/:id", (req, res) => {
    // do your magic!
});

router.put("/:id", (req, res) => {
    // do your magic!
});

//custom middleware

function validateUser(req, res, next) {
    // do your magic!
}

function validatePost(req, res, next) {
    // do your magic!
}

module.exports = router;
