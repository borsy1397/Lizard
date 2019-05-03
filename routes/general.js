const inverseAuthMW = require('../middlewares/general/inverseAuth');
const loginMW = require('../middlewares/general/login');
const logoutMW = require('../middlewares/general/logout');
const renderMW = require('../middlewares/general/render');
const signupMW = require('../middlewares/general/signup');
const mainRedirectMW = require('../middlewares/general/mainRedirect');

module.exports = app => {

    let objectRepository = {};

    app.use('/login',
        inverseAuthMW(objectRepository),
        loginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    app.use('/logout',
        logoutMW(objectRepository),
        (req, res, next) => {
            res.redirect('/');
        }
    );

    // Create user
    app.use('/signup',
        inverseAuthMW(objectRepository),
        signupMW(objectRepository),
        renderMW(objectRepository, 'signup')
    );

    app.get('/',
        mainRedirectMW(objectRepository)
    );

}


