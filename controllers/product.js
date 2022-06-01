const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const Category = require('../models/category');
const mongojs = require('mongojs');
const ObjectId = mongojs.ObjectId;

const fs = require('fs');

// add product
exports.addProduct = (req, res, next) => {
  var pictures = [];
  const url = req.protocol + '://' + req.get('host');
  req.files.map(fileTemp => {
    var fileUrl = url + '/files/' + fileTemp.filename;
    pictures.push(fileUrl);
  });

  var newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
    picture: pictures,
    stock: stock,
  });
  // save the product
  console.log(pictures);
  newProduct.save(function (err) {
    if (err) {
      return res.json({ success: false, msg: 'Product  already exists with same title' }); //If product exists already
    }
    res.json({ success: true, msg: 'Successful created new product.', data: newProduct });  //creation successfull
  });
}

// add product and Categroy in same time
exports.addProductAndCategroy = (req, res, next) => {


  // save the product

  category = Category.findOne({ title: req.body.category.title }, function (err, results) {
    if (err) {
      console.log(err);
    }
    if (!results) {
      var newCategory = new Category({  
        title: req.body.category.title,
        description: req.body.category.description });
      newCategory.save().then(data=>{
        categoryId = data._id;
      });
      var newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        categoryId: categoryId,
        stock: stock 
      });
      newProduct.save().then((p) => {
        console.log("product 9bal mansajlou",p);
        res.json({ success: true, msg: 'Successful created new product and category in same time.', product: p });  //creation successfull
    
      }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
          error: err
        });
      });
    } else {
      categoryId = results._id;
      console.log('category already exists and has id : ' + categoryId);
      var newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        categoryId: categoryId,
        stock: stock  
      });
      newProduct.save().then((p) => {
        console.log("product 9bal mansajlou",p);
        res.json({ success: true, msg: 'Successful created new product and category in same time.', product: p });  //creation successfull
    
      }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
          error: err
        });
      });    }
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
    stock: req.body.stock,
  };

  Product.findOneAndUpdate(filter, update).then((product) => {

    res.status(200).json({ success: true, msg: 'Successful update product', dataBeforeUpdate: product, data: update });
  }
  ).catch((error,) => {
    res.status(400).json({ success: false, msg: 'Failed to update product', error: error });
  })

}
// pour supprimer 
exports.deleteFile = (req, res, next) => {
  File.findByIdAndDelete({ _id: req.params.id }).then(
    (file) => {
      console.log(file);
      fs.unlink('./files/' + file.name, (err) => {
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

// get all products

exports.getAllProductsPagination = async (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {}
  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  Product.count({}, function (err, totalCount) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" }
    }
    Product.find({}, {}, query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { "error": true, "message": "Error fetching data" };
      } else {
        var totalPages = Math.ceil(totalCount / size)
        response = { "error": false, "products": data, "pages": totalPages, "total": totalCount, "pageIndex": pageNo };
      }
      res.json(response);
    }).populate('categoryId');
  })
};

// get products by Category
exports.getProductsByCategory = (req, res, next) => {
  var category;
  var category_id;
    Category.findOne({title: req.body.title}).then(c => {
    category = c;
    category_id = c._id.valueOf();
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  })
  Product.find({categoryId:category_id}).then(products => {

    
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
  if (decoded.role == 'admin') {
    const filter = { _id: req.params.id };
    Product.findOneAndDelete(filter).then((product) => {

      res.status(200).json({ success: true, msg: 'Successful delete product', dataDeleted: product });
    }
    ).catch((error,) => {
      res.status(400).json({ success: false, msg: 'Failed to delete product', error: error });
    })
  }
}



