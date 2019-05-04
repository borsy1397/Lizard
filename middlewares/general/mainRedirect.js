/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to: /question when signed in
 */

module.exports = objectrepository => {

    return (req, res, next) => {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/question');
        }

    };


};