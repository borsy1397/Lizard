/**
 * Using the template engine render the values into the template
 */
const moment = require('moment');

module.exports = (objectrepository, viewName) => {

    return (req, res, next) => {
        res.render(viewName, {
            data: res.locals,
            moment: moment
        });
    };

};