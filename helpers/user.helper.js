const bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");

exports.generatePassword = async (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

exports.comparePassword = async (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword);
};



