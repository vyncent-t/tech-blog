const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        console.log('')
        next();
    }
};

module.exports = withAuth;