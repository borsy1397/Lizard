/**
 * Get the question list and put the questions on res.tpl.question
 */
const Question = require('../../model/Question');

module.exports = objectrepository => {

    return (req, res, next) => {

        Question.find()
            .populate('responses')
            .exec()
            .then(questions => {
                if (!questions) {
                    return res.redirect('/question');
                } else {
                    res.locals.questions = [];
                    res.locals.profile = {};
                    res.locals.profile = req.session.userid;
                    res.locals.questions = questions;
                    return next();
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/question');
            });
    };

};