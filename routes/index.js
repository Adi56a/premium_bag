const express  = require('express')
const router  = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn')
const productModel  = require('../models/product-model');
const userModel = require('../models/user-model');


router.get('/',function(req,res){
    let error = req.flash('error')
    res.render('index',{error})
})

router.get('/shop',isLoggedIn,async (req,res) =>{
    let Products  = await productModel.find();
     
   res.render('shop',{Products})
} )

router.get('/addtocart/:id', isLoggedIn , async function(req,res){
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.id)
    await  user.save()
})

router.get('/cart',isLoggedIn,async (req,res) => {
    res.render('cart')
})

router.get('/logout',isLoggedIn, function(req,res) {
    req.flash('success',"Logged Out Successfully")
    res.redirect('/')
})


module.exports = router;