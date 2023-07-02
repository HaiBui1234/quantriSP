var CollectionModel=require("../../Model/Collection.model");
exports.ListUser= async(req,res,next)=>{
  
    try {
        let listUser=await CollectionModel.UserModel.find();
        if(listUser){
            return res.status(200).json(
                listUser
            )
        }else{
            return res.status(204).json(
                {
                    msg:"trong"
                }
            )
        }
    } catch (error) {
        return res.status(error.status).json({
            msg:"loi doc file"
        })
    }
}
exports.postUser= async(req,res,next)=>{
    if(req.method=="POST"){
       try {
        let User = new CollectionModel.UserModel();
        User.Username = req.body.Username;
        User.Email = req.body.Email;
        User.PassWord = req.body.PassWord;
        User.Role = req.body.Role;
        User.CapQuyen = false;
        try {
             await User.save();
        } catch (error) {
            console.log("loi");
            console.log(error)
        }
       } catch (error) {
        console.log(error);
       }
    }    
}
exports.updateUser= async(req,res,next)=>{
    let id=req.params.id;
    if(req.method== "POST"){
    let objUpdate=new CollectionModel.UserModel();
    objUpdate.Username = req.body.Username;
    objUpdate.Email = req.body.Email;
    objUpdate.PassWord = req.body.PassWord;
    objUpdate.Role = req.body.Role;
    objUpdate.CapQuyen = false;
    objUpdate._id=id;
    try {
     await CollectionModel.UserModel.findByIdAndUpdate(id,objUpdate);
    } catch (error) {
        console.log(error);
    }
    }
}