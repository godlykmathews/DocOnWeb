var express = require('express');
const { response } = require('../app');
var router = express.Router();
var productHelper = require('../helpers/product-helper')
var userHelper = require('../helpers/user-helper')
/* GET home page. */
router.get('/', function (req, res, next) {
  let user=req.session.user

  productHelper.getAllProducts().then((products) => {
    res.render('user/home', { products,user});
  })
});



router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/');
  }else{
    res.render('user/login', { "loginErr": req.session.loginErr });
    req.session.loginErr=false
  }  
})

router.get('/signup', (req, res) => {
  res.render('user/signup')
})
router.post('/signup', (req, res) => {

  userHelper.doSignup(req.body).then((response) => {
    console.log(response);
    res.redirect('/login')
  })
})
router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr="Invalid username or password"
      res.redirect('/login')
    }
  })
});

router.post('/',(req,res,next)=>{

  productHelper.addProduct(req.body,(id)=>{
    let image=req.files.image;
    image.mv('./public/patient-images/'+id+'.jpg',(err)=>{
      if(!err){
        res.render('/');
      }else{
        console.log(err);
      }
    })

  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;