 const taskController = require('../controllers/task.controller');
 const {validateCreateTask, validateListOfAllTasks, validateUpdateTask, validateDeleteTask} = require('../validations/task.validations');
 const {checkJwt} = require('../middlewares/checkJwt');
 const router = require('express').Router();


 router.post('/createTask',checkJwt, validateCreateTask,taskController.createTask);
 router.get('/getAllTasks',checkJwt,validateListOfAllTasks,taskController.getAllTasks);
 router.put('/updateTask/:id',checkJwt,validateUpdateTask,taskController.updateTask);
 router.delete('/deleteTask/:id',checkJwt,validateDeleteTask,taskController.deleteTask);

 module.exports = router;