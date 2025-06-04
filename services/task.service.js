const { JWT_SECRET, JWT_OPTIONS } = require('../constants/jwt.config');
const {generatePassword} = require('../helpers/user.helper');
const taskModel = require('../models/task.model');
const jwt = require('jsonwebtoken');

exports.getTaskByTitle = async(req) =>{
  const taskData = await taskModel.findOne({
    title: req.body.title
  })
    return taskData;
}

exports.createTask = async(req,res) =>{
  const title = req.body.title;
  const description = req.body.description;
  const due_date = req.body.due_date;
  let taskData = await taskModel({
    title: title,
    description: description,
    due_date: due_date
  }).save();
    return taskData._id;
}

exports.getTasksList = async(page, limit, skip, filter)=>{
    
    const tasksData = await taskModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ Created_On: -1 })
      .lean();    
    return tasksData;
}

exports.updateTaskById = async (taskId, updatedData) => {
  const taskData = await taskModel.findOneAndUpdate({'taskId':taskId }, {$set: updatedData}, {
    new: true,      
    runValidators: true 
  }).lean();

  return taskData;
};

exports.deleteTaskById = async (taskId) => {
 const deletedTask = await taskModel.findOneAndDelete({
     taskId: taskId 
    }).lean();
  return deletedTask;
}

