const User = require('../../model/User');
const bcrypt = require('bcrypt');
/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */

module.exports = objectrepository => {

    return (req, res, next) => {

        if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        User.findOne({ username: req.body.username })
            .exec()
            .then(user => {
                if (!user) {
                    res.locals.error.push('Invalid username or password!');
                    return next();
                } else {
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if (err) {
                            res.locals.error.push('Invalid username or password!');
                            return next();
                        }

                        if (result) {
                            
                            req.session.userid = user._id
      
                            return res.redirect('/');
                        } else {
                            res.locals.error.push('Invalid username or password!');
                            return next();
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.tpl.error.push('Invalid username or password!');
                return next();
            });

    };

};