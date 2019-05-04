const Question = require('../../model/Question');
/**
 * Load a question (if exists) with the :questionid param
 * and put it on res.tpl.question
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        Question
            .findOne({ _id: req.params.questionid })
            .populate({
                path: '_responses',
                model: 'Response',
                populate: {
                    path: '_owner',
                    model: 'User'
                }
            })
            .exec()
            .then(question => {
                if (!question) {
                    return res.redirect('/question');
                } else {
                    res.locals.profile = {};
                    res.locals.profile = req.session.userid;
                    res.locals.question = question;
                    return next();
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/question');
            });

    };

};