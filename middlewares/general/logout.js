/**
 * Logout
 */

module.exports = objectrepository => {

    return (req, res, next) => {
        req.session.destroy(err => {
            return next();
        });
    };

};