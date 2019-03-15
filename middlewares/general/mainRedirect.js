/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to: /question when signed in
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        return next();
    };

};