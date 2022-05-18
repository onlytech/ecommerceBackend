const User = require ('../models/user');
const jwt = require('jsonwebtoken');
const { exists } = require('../models/user');

 // customer sign up  
  exports.signup = async (req, res, next) => {
  
    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'}); //missing parameters
    } else {
      var newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.email.split('@')[0].trim(),
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,

      });
      // save the user

      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'email already exists'}); //If email exists already
        }
        if(newUser.role == "admin")
        res.json({success: true, msg: 'Successful created new admin.'});  //creation successfull
        else 
        res.json({success: true, msg: 'Successful created new user.'});  //creation successfull

      });
    } 
}

  // login function
  exports.login = async (req, res,next) => {
    User.findOne({
      username: req.body.username
      }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(),'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h'
          });
            // return the information including token as JSON
          var   responseUser = {
              email: user.email,
              role: user.role,
              username: user.username,
              _id : user._id
            } 
            res.json({success: true, token: token ,user: responseUser});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  }

 // user update data  
 exports.update = async (req, res, next) => {
      
    const filter = { _id: req.params.id };
    const update = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone,
     };

   User.findOneAndUpdate(filter, update).then((user) => {
        
        res.status(200).json({success: true, msg: 'Successful update',dataBeforeUpdate : user, data:update});  
    }
    ).catch((error,)=>{
        res.status(400).json({success:false, msg: 'Failed to update', error:error});
    })

}

// get all users (role user)
exports.getAllUsers = (req, res, next) => {
    User.find({role: 'user'}).then(users => {
      res.send(users);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    })
    };

    // search users
exports.searchUsers = (req, res, next) => {
  console.log(req.body.word);
    User.find(
      {$or:[ { firstname: { $regex: req.body.word, $options: 'i' } }, 
    { lastname: { $regex: req.body.word, $options: 'i' }},
    { address: { $regex: req.body.word, $options: 'i' }},
    { city: { $regex: req.body.word, $options: 'i' }},

   { 'phone': { $regex: req.body.word, $options: 'i' }},
    
     ]}
     ).then((users) => {
       console.log(users);
      res.send(users);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    })
    };

    // delete user
 exports.delete = (req, res, next) => {
  var token = req.headers.authorization.split(' ');
  var decoded = jwt.verify(token[1], 'RANDOM_TOKEN_SECRET');
  //console.log(decoded.role);
  if(decoded.role=='admin'){
  const filter = { _id: req.params.id };
  User.findOneAndDelete(filter).then((user) => {
      
      res.status(200).json({success: true, msg: 'Successful delete',dataDeleted : user});  
   }
  ).catch((error,)=>{
      res.status(400).json({success:false, msg: 'Failed to delete', error:error});
  })
 }
}



