const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post("/post/:id/create-comment", async (req, res) => {
    try {
        let newDate = new Date();
        const newPost = await Comment.create({
            commentBody: req.body.commentBody,
            commentDate: newDate,
            post_id: req.params.id,
            user_id: req.session.user_id
        });
        res.redirect(`/post/${req.params.id}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;