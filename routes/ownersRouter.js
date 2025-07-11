const express  = require('express')
const router  = express.Router();
const ownerModel  = require('../models/owner-model') 


router.get('/', function(req,res){
   
    res.send('Hey owners router is working ');
});





if(process.env.NODE_ENV == "development")
    {
    router.post('/create',async function (req,res){
        let owners  = await ownerModel.find();
        if(owners.length > 0){
            return res.status(500).send("you don't have permission to create owner")
        }

        let { fullname , email , password } = req.body;


        let createdOwner  = await ownerModel.create({
            fullname, 
            email, 
            password,
        })

        res.send(createdOwner)
    })

    router.get('/create',function(req,res){
        res.send('CREate successfully')
    })
}


router.get('/admin',(req,res) => {
    res.render('createProduct')
})



module.exports = router;