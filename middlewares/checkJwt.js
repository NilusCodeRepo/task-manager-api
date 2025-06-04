const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_OPTIONS } = require('../constants/jwt.config');
const customResponse = require('../utils/customeResponse');
const httpStatusCodes = require('../constants/httpStatusCodes');

exports.checkJwt = (req, res, next) => {
    //Get the jwt token from the head
    const token = req.headers['authorization'];
    console.log("Token : ",token);
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = (
            jwt.verify(token, JWT_SECRET, JWT_OPTIONS)
        );
        console.log("jwtPayload :",jwtPayload);
        res.locals.auth = jwtPayload;
        next();
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        return customResponse.sendResponse(res, {
            data: ""
        }, error.message, false, httpStatusCodes.UNAUTHORIZED)
    }
}