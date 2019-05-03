const Response = require('../../model/Response');
const User = require('../../model/User');
/**
 * Get question from res.tpl.question and send an answer to it
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        
        if ((typeof req.body === 'undefined') || (typeof req.body.response === 'undefined')) {
            return next();
        }

        response = new Response();

        response.text = req.body.response;
        response.date = Date.now();

        User.findOne({ _id: req.session.userid })
            .populate('_resQ')
            .exec()
            .then(user => {
                if (!user) {
                    return res.redirect('/question');
                } else {

                    response
                        .save()
                        .then(result => {
                            user._resQ.push(res.locals.question);
                            user.save().then(result => { }).catch(err => { });
                            return res.redirect(`/question/${res.locals.question._id}/details`);
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