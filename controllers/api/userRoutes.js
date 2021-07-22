const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.loggedIn = true;
        req.session.save();


        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400)
            console.log('Incorrect log in info. Please try again!')
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400);
            console.log('Incorrect password. Please try again!')
            return;
        }

        req.session.loggedIn = true;
        req.session.save();

        res.status(200).json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// logout route

router.post('/logout', (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(200);
            console.log(`LOGGING OUT BYE`)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;