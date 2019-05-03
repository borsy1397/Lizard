const mongoose = require('../util/db').mongoose;

const questionSchema = new mongoose.Schema({
    _responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }],
    date: { type: Date },
    title: { type: String },
    category: { type: String },
});

const Question = new mongoose.model('Question', questionSchema);

module.exports = Question;