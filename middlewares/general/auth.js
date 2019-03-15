/**
 * There are routes, where it is required to login. If the user is not logged in, redirects to /login
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        return next();
    };

};