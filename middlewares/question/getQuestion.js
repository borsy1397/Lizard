const Question = require('../../model/Question');
/**
 * Load a question (if exists) with the :questionid param
 * and put it on res.tpl.question
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        // res.locals.question = {
        //     title: "Question for update/details/new",
        //     responses: ["Response1 Response1 Response1 Response1 Response1Response1Response1 Response1 Response1",
        //         "Response1 Response1 Response1 Response1Response1 Response1 Response1"
        //     ]
        // }

        /**
         * MINDENHOVA questionid-t IRNI, AHOL CSAK SIMA ID SZEREPEL, MERT A ROUTENAL UGY VAN!!!!!!!!!!!!
         */
        Question
            .findOne({ _id: req.params.questionid })
            .populate('_responses')
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