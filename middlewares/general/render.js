/**
 * Using the template engine render the values into the template
 */

module.exports = (objectrepository, viewName) => {

    return (req, res, next) => {
        res.render(viewName, res.locals);
    };

};