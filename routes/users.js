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
router.get('/allUsers', auth, userCtrl.getAllUsers);

// search users by keyword
router.post('/searchUsers', auth, userCtrl.searchUsers);
module.exports = router;

// delete user
router.delete('/delete/:id', auth, userCtrl.delete);
