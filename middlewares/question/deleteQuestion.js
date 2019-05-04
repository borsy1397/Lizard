const Question = require('../../model/Question');
const User = require('../../model/User');
/**
 * Delete question
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        if (typeof res.locals.question === 'undefined') {
            return next();
        }

        User.findOne({
            _id: req.session.userid
        })
            .populate('_ownQ')
            .exec()
            .then(user => {

                for (let i = 0; i < user._ownQ.length; i++) {
                    if (user._ownQ[i]._id.equals(res.locals.question._id)) {
                        Question.deleteOne({
                            _id: res.locals.question._id
                        }, err => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('OK');
                            }
                        });
                        break;
                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/question');
            });

        res.redirect('/question');
    };

};