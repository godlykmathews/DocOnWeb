var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helper')

router.get('/', function (req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    
    res.render('admin/view-patients', { admin: true, products });
  })
 

});

module.exports = router;