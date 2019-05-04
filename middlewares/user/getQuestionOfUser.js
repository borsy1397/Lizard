const Question = require('../../model/Question');
/**
* Find questions which is asked by the user
 * and put it on res.tpl.user.questions
 */

module.exports = objectrepository => {

    return (req, res, next) => {
        res.locals.question = res.locals.user._ownQ;
        res.locals.myQ = true;
        return next();
    };

};