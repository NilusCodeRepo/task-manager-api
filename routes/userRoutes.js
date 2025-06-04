const {validateRegister, validateLogin} = require('../validations/user.validations');
const userController = require('../controllers/user.controller');
const router = require('express').Router();


router.post('/register',validateRegister, userController.createUser);
router.post('/login',validateLogin,userController.loginUser);


module.exports = router;