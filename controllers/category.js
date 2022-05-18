const jwt = require('jsonwebtoken');
const Category = require('../models/category');

// add Category
exports.addCategory = (req, res, next) => {
  var newCategory = new Category({
    title: req.body.title,
    description: req.body.description,
    parentId: req.body.parentId,
  });
  // save the category

  newCategory.save(function(err) {
    if (err) {
      return res.json({success: false, msg: 'Category already exists with same title'}); //If category exists already
    }
    res.json({success: true, msg: 'Successful created new category.',data:newCategory});  //creation successfull

  });
}

   // category update data  
   exports.updateCategory = async (req, res, next) => {
      
    const filter = { _id: req.params.id };
    const update = { 
        title: req.body.title,
        description: req.body.description,
        parentId: req.body.parentId,
     };
  
   Category.findOneAndUpdate(filter, update).then((category) => {
        
        res.status(200).json({success: true, msg: 'Successful update category',dataBeforeUpdate : category, data:update});  
    }
    ).catch((error,)=>{
        res.status(400).json({success:false, msg: 'Failed to update category', error:error});
    })
  }

  // get all categories
exports.getAllCategories = (req, res, next) => {
  Category.find().then(categories => {
    res.send(categories);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  })
  };

  exports.deleteCategory = (req, res, next) => {
    var token = req.headers.authorization.split(' ');
    var decoded = jwt.verify(token[1], 'RANDOM_TOKEN_SECRET');
    //console.log(decoded.role);
    if(decoded.role=='admin'){
    const filter = { _id: req.params.id };
    Category.findOneAndDelete(filter).then((category) => {
        
        res.status(200).json({success: true, msg: 'Successful delete category',dataDeleted : product});  
     }
    ).catch((error,)=>{
        res.status(400).json({success:false, msg: 'Failed to delete category', error:error});
    })
   }
  }





