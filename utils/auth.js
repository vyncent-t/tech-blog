const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        console.log('req session logged in')
        next();
    }
};

module.exports = withAuth;