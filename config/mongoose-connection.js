const mongoose  = require('mongoose')
const config = require('config')

mongoose.connect(`${config.get("MONGODB_URI")}`)
.then(function(){
 console.log('Connected to DataBase Successfully')
})
.catch(function(err){
 console.log('Something went wrong connecting with database',err)
})

module.exports = mongoose.connection;