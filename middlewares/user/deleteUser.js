const User = require('../../model/User');
/**
 * Delete user
 */

module.exports = objectrepository => {

    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }

        User.deleteOne({
            _id: res.locals.user._id
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