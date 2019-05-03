/**
 * There are routes, where it is required to login. If the user is not logged in, redirects to /login
 */

module.exports = (objectrepository) => {

    return (req, res, next) => {
        if (typeof req.session.userid === 'undefined') {
            console.log("miafaszertnemengedszelbasdzmeg");
            return res.redirect('/');
        }
        
        return next();
    };

};