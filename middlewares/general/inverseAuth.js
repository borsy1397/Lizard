/**
 * If the user is logged in, redirects to /questions
 */

module.exports = (objectrepository) => {

    return (req, res, next) => {
        if (typeof req.session.userid !== 'undefined') {
            return res.redirect('/');
        }
        return next();
    };

};