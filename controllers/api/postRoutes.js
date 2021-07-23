const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'post_title', 'post_body', 'post_date'],
            order: [
                ['post_date', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'comment_date'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        })
        const posts = res.json(postData.reverse())
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        let newDate = new Date();
        const postData = await Post.create({
            user_id: req.session.user_id,
            post_date: newDate,
            post_title: req.body.post_title,
            post_body: req.body.post_body,
        })
        res.status(200).json(postData)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
})


router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update({
            post_title: req.body.post_title,
            post_body: req.body.post_body,
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
        const postData = await Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            })
        if (!postData) {
            res.status(404).json({ message: 'no post matching that id' })
            console.log(err)
            return
        }

        res.status(200)
        res.json(postData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;