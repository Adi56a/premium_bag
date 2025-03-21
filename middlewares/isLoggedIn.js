const jwt  = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports.isLoggedIn = async function(req,res,next){
    if(!req.cookies.token){
        req.flash('error',"you need to login first")
        return res.redirect('/')
    }

    try {
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await userModel
        .findOne({email:decoded.email })
        .select('-password')

       

        req.currentUser = user;
        next()
        
        
    }
    catch(err){
         req.flash('error',"something Went wrong")   
         res.redirect('/')
    }
}


