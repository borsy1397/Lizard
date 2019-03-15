const authMW = require('../middlewares/general/auth');
const renderMW = require('../middlewares/general/render');
const getAllQuestionMW = require('../middlewares/question/getAllQuestion');
const getQuestionByCategoryMW = require('../middlewares/question/getQuestionByCategory');
const getQuestionMW = require('../middlewares/question/getQuestion');
const updateQuestionMW = require('../middlewares/question/updateQuestion');
const deletQuestionMW = require('../middlewares/question/deleteQuestion');
const answerQuestionMW = require('../middlewares/question/answerQuestion');


module.exports = app => {

    let objectRepository = {};


    // Return all questions
    app.use('/question',
        //authMW(objectRepository), do not required
        getAllQuestionMW(objectRepository),
        renderMW(objectRepository, 'questions')
    );

    // Ask new question
    app.use('/question/new',
        authMW(objectRepository),
        updateQuestionMW(objectRepository),
        renderMW(objectRepository, 'question_edit')
    );

    // Return one question with its responses
    app.use('/question/:questionid/details',
        authMW(objectRepository),
        getQuestionMW(objectRepository),
        renderMW(objectRepository, 'question_detail')
    );

    // Update the question
    app.use('/question/:questionid/edit',
        authMW(objectRepository),
        getQuestionMW(objectRepository),
        updateQuestionMW(objectRepository),
        renderMW(objectRepository, 'question_edit')
    );

    // Delete the question
    app.use('/question/:questionid/delete',
        authMW(objectRepository),
        getQuestionMW(objectRepository),
        deletQuestionMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/question');
        }
    );

    // Answer a question
    app.use('/question/:questionid/answer',
        authMW(objectRepository),
        getQuestionMW(objectRepository),
        answerQuestionMW(objectRepository), 
        function (req, res, next) {
            return res.redirect('/question/:questionid/details');
        }
    );

    // Return the category's questions
    app.use('/question/:categoryid/category',
        getQuestionByCategoryMW(objectRepository),
        renderMW(objectRepository, 'questions')
    );

}



