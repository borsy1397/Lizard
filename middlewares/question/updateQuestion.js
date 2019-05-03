const Question = require('../../model/Question');
const User = require('../../model/User');
/**
 *  Create (or update) question if we have the data for it
 *  update if we have a res.tpl.question, create if we don't have
 *  - if there is no question, set tpl.error
 *  - if everything is ok redirect to /question
 */

module.exports = objectrepository => {

    /**
     * A kerdes kiirojanal elmenteni ezt a kerdest
     */

    return (req, res, next) => {

        console.log("na kiirsz valamit?");

        if (typeof req.body.title === 'undefined') {
            return next();
        }

        let question = undefined;
        if (typeof res.locals.question !== 'undefined') {
            question = res.locals.question;
        } else {
            question = new Question();
        }

        question.title = req.body.title;
        question.category = req.body.category;
        question.date = Date.now();

        console.log(question);

        let resultid = null;


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
                            user._ownQ.push(question);
                            user.save().then(result => { }).catch(err => { });
                            return res.redirect(`/question/${result._id}/details`); // result._id ?
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