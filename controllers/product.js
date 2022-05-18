const jwt = require('jsonwebtoken');
const Product = require('../models/product');

const fs = require('fs');

    // add product
    exports.addProduct = (req, res, next) => {
     var pictures = [] ;
    const url = req.protocol + '://' + req.get('host');
    req.files.map(fileTemp => {
    var fileUrl= url + '/files/' + fileTemp.filename;
    pictures.push(fileUrl);
  });
       
  var newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        picture: pictures
      });
      // save the product
      console.log(pictures);
      newProduct.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Product  already exists with same title'}); //If product exists already
        }
        res.json({success: true, msg: 'Successful created new product.',data:newProduct});  //creation successfull
      });
    }
    
    // add product and Categroy in same time
    exports.addProductAndCategroy = (req, res, next) => {
      var newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
      });

      var newCategory = new Category({
        title: req.body.category.title,
        description: req.body.category.description,
      });
      // save the product

      newProduct.save().then((d) => {
        newCategory.save().then((c) =>{
          res.json({success: true, msg: 'Successful created new product and category in same time.',data:d});  //creation successfull
        });
      });
    }

  // product update data  
 exports.updateProduct = async (req, res, next) => {
      
  const filter = { _id: req.params.id };
  const update = { 
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId,
   };

 Product.findOneAndUpdate(filter, update).then((product) => {
      
      res.status(200).json({success: true, msg: 'Successful update product',dataBeforeUpdate : product, data:update});  
  }
  ).catch((error,)=>{
      res.status(400).json({success:false, msg: 'Failed to update product', error:error});
  })

}
 // pour supprimer 
exports.deleteFile = (req, res, next) => {
    File.findByIdAndDelete({ _id: req.params.id }).then(
      (file) => {
        console.log(file);
        fs.unlink('./files/'+file.name, (err) => {
          if (err) {
            console.error(err)
            return
          }
          //file removed
        })
        res.status(201).json({
          message: 'File Deleted !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }

// get all products
exports.getAllProducts = (req, res, next) => {
  Product.find().populate('categoryId').then(products => {
    res.send(products);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  })
  };

      // delete product
 exports.deleteProduct = (req, res, next) => {
  var token = req.headers.authorization.split(' ');
  var decoded = jwt.verify(token[1], 'RANDOM_TOKEN_SECRET');
  //console.log(decoded.role);
  if(decoded.role=='admin'){
  const filter = { _id: req.params.id };
  Product.findOneAndDelete(filter).then((product) => {
      
      res.status(200).json({success: true, msg: 'Successful delete product',dataDeleted : product});  
   }
  ).catch((error,)=>{
      res.status(400).json({success:false, msg: 'Failed to delete product', error:error});
  })
 }
}



