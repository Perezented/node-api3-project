const express = require("express");
const Users = require("./userDb");
const router = express.Router();
router.use(validateUser);
router.use(validateUserId);

router.post("/", (req, res) => {
    // do your magic!
});

router.post("/:id/posts", (req, res) => {
    // do your magic!
});

router.get("/", validateUserId, (req, res) => {
    // do your magic!
    res.status(200).json({ Users });
});

router.get("/:id", (req, res) => {
    // do your magic!
});

router.get("/:id/posts", (req, res) => {
    // do your magic!
});

router.delete("/:id", (req, res) => {
    // do your magic!
});

router.put("/:id", (req, res) => {
    // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.getById(id)
        .then((user) => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: "User ID not found" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Process failed", err });
        });
}

function validateUser(req, res, next) {
    // do your magic!
    // Users.getById(req.params.id)
    //     .then((user) => {
    //         if (!user) {
    //             res.status(404).json({
    //                 message:
    //                     "validateUser blocked this request as the user is not in the data base.",
    //             });
    //         } else {
    //             req.user = user;
    //             next();
    //         }
    //     })
    //     .catch((error) => {
    //         res.status(500).json({
    //             message: "Error getting the information you seek.",
    //         });
    //     });
}

function validatePost(req, res, next) {
    // do your magic!
}

module.exports = router;
