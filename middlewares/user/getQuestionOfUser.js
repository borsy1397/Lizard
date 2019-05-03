const Question = require('../../model/Question');
/**
* Find questions which is asked by the user
 * and put it on res.tpl.user.questions
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.locals.question = res.locals.user._ownQ;
        return next();
    };

};