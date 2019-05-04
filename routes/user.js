const authMW = require('../middlewares/general/auth');
const renderMW = require('../middlewares/general/render');
const getUserMW = require('../middlewares/user/getUser');
const deleteUserMW = require('../middlewares/user/deleteUser');
const getQuestionOfUserMW = require('../middlewares/user/getQuestionOfUser');
const getResponsOfUserMW = require('../middlewares/user/getResponseOfUser');


module.exports = app => {

    let objectRepository = {};

    // Delete user
    app.use('/user/:userid/delete',
        authMW(objectRepository),
        getUserMW(objectRepository),
        deleteUserMW(objectRepository),
        (req, res, next) => {
            return res.redirect('/question');
        }
    );

    // Return questions of user
    app.use('/user/:userid/question',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getQuestionOfUserMW(objectRepository),
        renderMW(objectRepository, 'user_questions') 
    );

    // Return that questions which is answered by the user
    app.use('/user/:userid/response',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getResponsOfUserMW(objectRepository),
        renderMW(objectRepository, 'user_questions') 
    );
    // Return one user (profile)
    app.use('/user/:userid',
        authMW(objectRepository),
        getUserMW(objectRepository),
        renderMW(objectRepository, 'profile')
    );

}
