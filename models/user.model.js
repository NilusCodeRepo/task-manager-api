const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var userSchema = mongoose.Schema({
    "userId": { type: Number, unique: true },
    "firstName": { type: String, default: "" },
    "lastName":  { type: String, default: "" },
    "email":  { type: String, default: "" },
    "password":  { type: String, default: "" },
    "phoneNumber":  { type: String, default: "" },
     "Created_On" : { type: Date, default: Date.now }

});

// Plugin for auto-increment
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model('User', userSchema);

module.exports = User;
