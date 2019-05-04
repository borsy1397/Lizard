const bcrypt = require('bcrypt');
const User = require('../../model/User');

/**
 * Check if the username is already registered, if not
 * create the user
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        console.log("miafaszvan");

        if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        const userData = {
            username: req.body.username,
            password: req.body.password
        };

        if (userData.username.length < 4) {
            return res.status(406).json({
                message: "Username is too short. Minimum length is 4 characters"
            });
        }

        if (userData.password.length < 4) {
            return res.status(406).json({
                message: "Password is too short. Minimum length is 4 characters"
            });
        }
        bcrypt.hash(userData.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                    message: "Problem with hash"
                });
            } else {
                const newUser = new User({
                    username: userData.username,
                    password: hash
                });
                newUser
                    .save()
                    .then(result => {
                        console.log(result);
                        res.redirect('/login');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                            message: "This username already exists. Choose another one!"
                        });
                    });
            }
        });
    }
};