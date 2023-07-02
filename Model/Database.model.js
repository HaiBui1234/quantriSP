var mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/QTAssignment")
.catch(Error=>{
    console.log(Error);
});
module.exports={mongoose};