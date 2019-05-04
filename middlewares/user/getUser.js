const User = require('../../model/User');
/**
 * Load a user (if exists) with the :userid param
 * and put it on res.locals.user
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        User.findOne({ _id: req.params.userid })
        .populate('_ownQ')
        .populate('_resQ')
            .exec()
            .then(user => {
                if (!user) {
                    return res.redirect('/question');
                } else {
                    res.locals.user = user;
                    return next();
                }
            })
            .catch(err => {
                console.log(err);
                res.redirect('/question');
            });
    };

};