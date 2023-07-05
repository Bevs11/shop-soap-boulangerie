const  mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
    email: String
}, {timestamps: true}
);

module.exports = mongoose.model('Email', EmailSchema);