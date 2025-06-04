const jwt = require('jsonwebtoken');
const userService = require('../services/user.service')
const { comparePassword } = require('../helpers/user.helper');
const { JWT_SECRET, JWT_OPTIONS } = require('../constants/jwt.config');
const { MESSAGES } = require('../constants/messages');
const customResponse = require('../utils/customeResponse');
const httpStatusCodes = require('../constants/httpStatusCodes');


exports.createUser = async(req,res) =>{
    try{
                //check email already exist or not
        const emailData = await userService.getUserByEmail(req);
        console.log("emailData : ",emailData);
        if (emailData) {
            return customResponse.sendResponse(
                res,
                {
                    userDetails: emailData,
                },
                MESSAGES.EMAIL_ALREADY_EXIST,
                false,
                httpStatusCodes.INTERNAL_SERVER_ERROR
            );
        } else {
          let userData = await userService.createUser(req);
          return customResponse.sendResponse(
                res,
                {
                    message: MESSAGES.USER_CREATED_SUCCESSFULLY,
                    userId: userData,
                },
                MESSAGES.USER_CREATED_SUCCESSFULLY,
                true,
                httpStatusCodes.OK
            );  
        }
    }catch(error){
        return customResponse.sendResponse(
            res,
            {
                data: "",
                errorMsg: error.message
            },
            MESSAGES.SOMETHING_WENT_WRONG, true,
            httpStatusCodes.BAD_REQUEST
        );
    }
}


exports.loginUser = async(req,res) =>{
    try{
            const userData = await userService.getUserByEmail(req);
            if(userData){
                  const checkPassword = await comparePassword(req.body.password, userData.password)
            if (checkPassword) {
                const tokenData = {
                    id: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName
                }
                const token = jwt.sign(
                    tokenData,
                    JWT_SECRET,
                    JWT_OPTIONS
                )
                return customResponse.sendResponse(res, {
                    data: tokenData,
                    token: token,
                }, MESSAGES.LOGIN_SUCCESSFULLY, false, httpStatusCodes.OK)
            }else{
                return customResponse.sendResponse(res, {
                    data: ""
                }, MESSAGES.INCORRECT_PASSWORD, false, httpStatusCodes.BAD_REQUEST)
            }
            }else{
                 return customResponse.sendResponse(res, {
                    data: ""
                }, MESSAGES.USER_NOT_EXIST, false, httpStatusCodes.BAD_REQUEST)
            }
          
    }catch(error){
         return customResponse.sendResponse(res, {
            data: "",
            errorMsg: error.message
        }, MESSAGES.SOMETHING_WENT_WRONG, true, httpStatusCodes.BAD_REQUEST)
    }
}

