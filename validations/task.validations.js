const Joi = require('joi');
const { JoiException } = require("../helpers/joi.exception");
const customResponse = require('../utils/customeResponse');
const httpStatusCodes = require('../constants/httpStatusCodes');

exports.validateCreateTask = async(req,res,next)=>{
    const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.any().required(),
    due_date: Joi.string().required(),
    status: Joi.string().optional()
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

exports.validateUpdateTask = async(req,res,next) =>{
    const schema = Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.any().optional(),
    due_date: Joi.string().optional(),
    status: Joi.string().optional()
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

exports.validateDeleteTask = async(req,res,next)=>{
    const schema = Joi.object().keys({
        id: Joi.number().required()
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

exports.validateListOfAllTasks =  async(req,res,next) =>{
    const schema = Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required(),
        search: Joi.string().optional(),
    });

    const { error } = await JoiException(schema, req.query);
    if (error) {

        return customResponse.sendResponse(res, {
            status: httpStatusCodes.BAD_REQUEST,
            message: 'Validation Error',
            detailedMessage: error
        }, error, true, httpStatusCodes.BAD_REQUEST)
    }

    return next();
}