const User = require('../../model/User');
/**
 * Delete user
 */

module.exports = objectrepository => {

    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }

        if (res.locals.user._id.equals(req.session.userid)) {
            User.deleteOne({
                _id: res.locals.user._id
            }, err => {
                if (err) {
                    console.log(err);
                } else {
                    req.session.destroy(err => {
                        return next();
                    });
                }
            });
        }


        res.redirect('/question');
    };

};