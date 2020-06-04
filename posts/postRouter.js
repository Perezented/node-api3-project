const express = require("express");

const router = express.Router();
const Posts = require("./postDb");
// custom middleware

function validatePostId(req, res, next) {
    // do your magic!
    Posts.getById(req.params.id).then((post) => {
        if (req.post) {
            res.status(400).json({ message: "invalid id" });
        } else {
            req.post = post;
            next();
        }
    });
}

router.get("/", (req, res) => {
    // do your magic!
    Posts.get(req.query)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({
                error: "cannot get the data requested",
                err,
            });
        });
});

router.get("/:id", validatePostId, (req, res) => {
    // do your magic!
    if (req.post) {
        res.status(200).json(req.post);
    } else
        res.status(400).json({ error: "That post ID is not in the data base" });
});

router.delete("/:id", validatePostId, (req, res) => {
    // do your magic!
    if (req.post) {
        Posts.remove(req.params.id).then(
            res.status(204).json({ message: "Post was deleted." })
        );
        res.status(204).json({ message: "Post was deleted." });
    } else res.status(404).json({ error: "Selected post is not found." });
});

router.put("/:id", validatePostId, (req, res) => {
    // do your magic!
    if (req.post) {
        req.body.id = req.post.id;
        Posts.update(req.post.id, req.body).then(
            res.status(203).json(req.body)
        );
    } else res.status(404).json({ error: "Selected post is not found." });
});

module.exports = router;
