const express  = require('express')
const router  = express.Router()
 

router.get('/', function(req,res){
    res.send('users routers are working  ');
});


router.get('/create',function(req,res){
    res.send('Users cerated from this ropute')
})
module.exports = router;