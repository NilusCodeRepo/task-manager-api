const jwt = require('jsonwebtoken');
const taskService = require('../services/task.service');
const taskModel = require('../models/task.model');
const { JWT_SECRET, JWT_OPTIONS } = require('../constants/jwt.config');
const { MESSAGES } = require('../constants/messages');
const customResponse = require('../utils/customeResponse');
const httpStatusCodes = require('../constants/httpStatusCodes');

exports.createTask = async(req,res) =>{
    try{
                //check task title already exist or not
        const taskData = await taskService.getTaskByTitle(req);
        if (taskData) {
            return customResponse.sendResponse(
                res,
                {
                    taskDetails: taskData,
                },
                MESSAGES.TASK_ALREADY_EXIST,
                false,
                httpStatusCodes.INTERNAL_SERVER_ERROR
            );
        } else {
          let taskData = await taskService.createTask(req);
          return customResponse.sendResponse(
                res,
                {
                    message: MESSAGES.TASK_CREATED_SUCCESSFULLY,
                    userId: taskData,
                },
                MESSAGES.TASK_CREATED_SUCCESSFULLY,
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


exports.getAllTasks = async(req,res) =>{
    try{
        let { page, limit, search } = req.query;
        const skip = (page - 1) * limit;
        let filter = {};
        if(search){
            filter = {
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ]
        };
        }      

        const taskData = await  taskService.getTasksList(page,limit,skip,filter);
        const total = await taskModel.countDocuments(filter);

        return customResponse.sendResponse(res, {
            contactist: {
                count: total,
                rows: taskData
            }
        }, MESSAGES.TASK_FETCHED_SUCCESSFULLY, false, httpStatusCodes.OK)

    }catch(error){
         return customResponse.sendResponse(res, {
            contactist: {},
            errorMsg: error.message
        }, MESSAGES.SOMETHING_WENT_WRONG, true, httpStatusCodes.BAD_REQUEST)
    }
}

exports.updateTask = async(req,res)=>{
    try{
        const taskId = req.params.id;
        const updatedData = req.body;

        let taskData = await taskService.updateTaskById(taskId,updatedData);
        return customResponse.sendResponse(
                res,
                {
                    message: MESSAGES.TASK_UPDATED_SUCCESSFULLY,
                    UpdatedTask: taskData,
                },
                MESSAGES.TASK_UPDATED_SUCCESSFULLY,
                true,
                httpStatusCodes.OK
            );  

    }catch(error){
        return customResponse.sendResponse(res, {
            contactist: {},
            errorMsg: error.message
        }, MESSAGES.SOMETHING_WENT_WRONG, true, httpStatusCodes.BAD_REQUEST)
    }
}

exports.deleteTask = async(req,res) =>{
    try{
        const taskId = req.params.id;

        const deletedTask = await taskService.deleteTaskById(taskId);
        
        return customResponse.sendResponse(
                res,
                {
                    message: MESSAGES.TASK_DELETED_SUCCESSFULLY,
                    DeletedTask: deletedTask,
                },
                MESSAGES.TASK_DELETED_SUCCESSFULLY,
                true,
                httpStatusCodes.OK
            );  
    }catch(error){
        return customResponse.sendResponse(res, {
            contactist: {},
            errorMsg: error.message
        }, MESSAGES.SOMETHING_WENT_WRONG, true, httpStatusCodes.BAD_REQUEST)
    }
}