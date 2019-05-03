const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WD1I2H', {
    useNewUrlParser: true,
    useCreateIndex: true
});

module.exports.mongoose = mongoose;