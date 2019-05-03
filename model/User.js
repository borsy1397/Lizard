const mongoose = require('../util/db').mongoose;

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    _ownQ: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}], // sajat
    _resQ: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}], // megvalaszolt
});

const User = new mongoose.model('User', userSchema);

module.exports = User;