const Question = require('../../model/Question');
const User = require('../../model/User');
/**
 *  Create (or update) question if we have the data for it
 *  update if we have a res.tpl.question, create if we don't have
 *  - if there is no question, set tpl.error
 *  - if everything is ok redirect to /question
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        if (typeof req.body.title === 'undefined') {
            return next();
        }

        let question = undefined;
        let find = false;
        if (typeof res.locals.question !== 'undefined') {
            question = res.locals.question;
            find = true;
        } else {
            question = new Question();
        }

        question.title = req.body.title;
        if (typeof req.body.category !== 'undefined') {
            question.category = req.body.category;
        }
        question.date = Date.now();

        User.findOne({ _id: req.session.userid })
            .populate('_ownQ')
            .exec()
            .then(user => {
                if (!user) {
                    return res.redirect('/question');
                } else {
                    question
                        .save()
                        .then(result => {
                            if (!find) {
                                user._ownQ.push(question);
                                user.save().then(result => { }).catch(err => { });
                            }
                            return res.redirect(`/question/${result._id}/details`); 
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/question');
            });
    };

};