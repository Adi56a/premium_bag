const userModel = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')




module.exports.registerUser = async function(req,res){
    
    let {fullname , email , password}  = req.body; 
    try{
        let userExist  = await userModel.findOne({email});

        if (userExist){
            req.flash('error', 'User already exists');
            return res.status(400).redirect('/');
        }

        const salt  = await bcrypt.genSalt(15);
        const hashedPassword  = await bcrypt.hash(password,salt);

        let registeredUser  = await userModel.create({
            email,
            fullname, 
            password:hashedPassword,
        });

        let token  = jwt.sign({email,id:registeredUser._id},process.env.JWT_KEY);
        res.cookie('token',token);

        res.status(201).send("USER CREATED SUCCESSFULLY");



    }catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Erroor')
    }


}

module.exports.loginUser  =  async function (req,res){
      
    let {email , password } = req.body;

      try{
            
             
            let userExist  = await userModel.findOne({email})

            if(!userExist){
                req.flash('error','Something is Wrong ')
                return res.status(404).redirect('/')
            }
            

          bcrypt.compare(password,userExist.password,(err,result) => {
            if(result){
                let token  = jwt.sign({email,id:userExist._id},process.env.JWT_KEY);
                res.cookie('token',token);
                req.flash("success",'User Logged in Successfully ')
                res.redirect('/shop')
 
            }
            else{
                res.send('plese check your password')
            }
          })
             

         
            
            
      }
      catch(err){
            res.send(err)
      }
}