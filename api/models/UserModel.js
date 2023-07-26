const  mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    isAdmin: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
   
}, {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);