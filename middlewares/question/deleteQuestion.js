const Question = require('../../model/Question');
/**
 * Delete question
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        if (typeof res.locals.question === 'undefined') {
            return next();
        }

        Question.deleteOne({
            _id: res.locals.question._id
        }, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('OK');
            }
        });

        res.redirect('/question');
    };

};