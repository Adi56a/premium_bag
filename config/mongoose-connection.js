const mongoose  = require('mongoose')

mongoose.connect('mongodb+srv://adityajogdand15:ugaZmh2bXP8URUoe@practice.5gmcg.mongodb.net/?retryWrites=true&w=majority&appName=practice')
.then(function(){
console.log('Connected to DataBase Successfully')
})
.catch(function(err){
console.log('Something went wrong connecting with database',err)
})

module.exports = mongoose.connection;