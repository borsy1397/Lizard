const Question = require('../../model/Question');
/**
 * Find questions which is answered by the user
 * and put it on res.tpl.user.responses
 */

module.exports = objectrepository => {

    return (req, res, next) => {
        res.locals.question = res.locals.user._resQ;
        return next();
    };

};