const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

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

        // follow
        const posts = postData.map((project) => project.get({ plain: true }));

        res.render('dashboard', {
            posts: posts,
            post_title: posts.post_title,
            post_date: posts.post_date,
            post_body: posts.post_body
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.post('/create-post', withAuth, async (req, res) => {
    try {
        let newDate = new Date();
        const postData = await Post.create({
            post_title: req.body.title,
            post_body: req.body.body,
            post_date: newDate,
            user_id: req.body.user_id
        })
        res.status(200).json(postData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})



router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'post_title', 'post_body', 'post_date'],
            include: [
                {
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
        });

        if (!postData) {
            res.status(404).json({ message: 'no post matching that id' })
            console.log(err)
            return
        }


        // follow
        const posts = postData;
        const comments = posts.comments.map((project) => project.get({ plain: true }));

        res.render('edit', {
            posts: posts,
            id: posts.id,
            post_title: posts.post_title,
            post_date: posts.post_date,
            post_body: posts.post_body,
            comments: comments,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;