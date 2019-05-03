const mongoose = require('../util/db').mongoose;

const responseSchema = new mongoose.Schema({
    _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date},
    text: { type: String},
});

const Response = new mongoose.model('Response', responseSchema);

module.exports = Response;