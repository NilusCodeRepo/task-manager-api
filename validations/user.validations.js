const Joi = require("joi");
const { JoiException } = require("../helpers/joi.exception");
const customResponse = require('../utils/customeResponse');
const httpStatusCodes = require('../constants/httpStatusCodes');

exports.validateRegister = async(req,res,next)=>{
    const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.any().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phoneNumber: Joi.number().required()
    });

    const { error } = await JoiException(schema, req.body);

    if (error) {

    return customResponse.sendResponse(res, {
      status: httpStatusCodes.BAD_REQUEST,
      message: 'Validation Error',
      detailedMessage: error
    }, error, true, httpStatusCodes.BAD_REQUEST)
  }

  return next();
};

exports.validateLogin = async(req,res,next) =>{
    const schema = Joi.object().keys({
    email: Joi.string().required().email().message('Email must be a valid email'),
    password: Joi.any().required()
    });
     const { error } = await JoiException(schema, req.body);

  if (error) {

    return customResponse.sendResponse(res, {
      status: httpStatusCodes.BAD_REQUEST,
      message: 'Validation Error',
      detailedMessage: error
    }, error, true, httpStatusCodes.BAD_REQUEST)
  }

  return next();
}
