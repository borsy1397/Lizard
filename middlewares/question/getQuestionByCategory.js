const Question = require('../../model/Question');

/**
 * Load questions (if exists) which is belonged to category with the :categoryid param
 * and put it on res.tpl.question
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        Question.find({ category: req.params.categoryid })
            .exec()
            .then(question => {
                if (!question) {
                    return res.redirect('/question');
                } else {
                    res.locals.questions = [];
                    res.locals.profile = {};
                    res.locals.profile = req.session.userid;
                    res.locals.questions = question;
                    return next();
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/question');
            });

    };

};