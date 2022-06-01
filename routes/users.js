var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var userCtrl = require('../controllers/user');


// Add User
router.post('/signup', userCtrl.signup);

// login 
router.post('/login', userCtrl.login);

// update
router.put('/update/:id', auth, userCtrl.update);

// get all users (role = user)
router.get('/allUsers',  userCtrl.getAllUsers);

// search users by keyword
router.post('/searchUsers', auth, userCtrl.searchUsers);

// delete user
router.delete('/delete/:id', auth, userCtrl.delete);

// reset user password
router.post('/resetPassword', userCtrl.resetPassword);
// confirm reset user password
router.post('/password-reset/:userId/:token', userCtrl.newPassword);

module.exports = router;

