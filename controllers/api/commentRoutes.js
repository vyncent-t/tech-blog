const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'comment_date'],
            order: [
                ['comment_date', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['username']
            }
            ]
        })
        res.status(200).json(commentData)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'comment_date'],
            order: [
                ['comment_date', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['username']
            }
            ]
        })

        if (!commentData) {
            res.status(404).json({ message: 'no comment matching that id' })
            return;
        }

        res.status(200).json(commentData)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        let newDate = new Date();
        const commentData = await Comment.create({
            comment_body: req.body.comment_body,
            comment_date: newDate,
            post_id: req.body.post_id
        })
        res.status(200).json(commentData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        let newDate = new Date();
        const postData = await Comment.update({
            comment_body: req.body.comment_body
        }, {
            where: {
                id: req.params.id
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'no post matching that id' })
            console.log(err)
            return
        }

        res.status(200).json(postData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({ where: { id: req.params.id } })

        if (!commentData) {
            res.status(404).json({ message: 'no comment matching that id' })
            return;
        }

        res.status(200).json(commentData)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;