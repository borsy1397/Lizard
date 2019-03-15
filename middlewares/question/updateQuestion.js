/**
 *  Create (or update) question if we have the data for it
 *  update if we have a res.tpl.question, create if we don't have
 *  - if there is no question, set tpl.error
 *  - if everything is ok redirect to /question
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        return next();
    };

};