const express  = require('express')
const router  = express.Router()
const upload  = require('../config/multer-config')
const productModel  = require('../models/product-model')

router.get('/', function(req,res){
    res.send('product router is working ');
});

router.post('/create',upload.single('image'),async function(req,res){

    let {name , price , discount , bgcolor , panelcolor, textcolor} = req.body;


    try{
    let createdProduct  = await productModel.create({
        image: req.file.buffer,
        name , 
        price , 
        discount,
        bgcolor,
        panelcolor,
        textcolor

    })
     req.flash('success' ,'Product Create Successfully')
    res.redirect('/owners/admin')
}
    catch(error){
        res.send('Error occured during creation of proudect')
    }
})

module.exports = router;