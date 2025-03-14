const express  = require('express')
const router  = express.Router()
 

router.get('/', function(req,res){
    res.send('product router is working ');
});

router.get('/create',function(req,res){
    res.send('product is created from this route')
})

module.exports = router;