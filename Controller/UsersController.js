var CollectionModel = require('../Model/Collection.model');
exports.getListUser = async (req, res, next) => {
    let username=req.query.username;
    let Role=req.query.Role;
    console.log(Role)
    let SapXep=req.query.SapXep;
    let ListUser;
    if(Role==null||SapXep==null){
        ListUser = await CollectionModel.UserModel.find();
    }else if(Role==0&&SapXep==0){
        ListUser = await CollectionModel.UserModel.find();
    }
    else{
        if(SapXep==0){
            ListUser = await CollectionModel.UserModel.find({Role:Role});
        }else{
            ListUser = await CollectionModel.UserModel.find({Role:Role}).sort({Username:SapXep})
        }
    }
    if(username!=null){
        ListUser = await CollectionModel.UserModel.find({Username:username});
      
    }
    res.render('Accout/ListUsers', { ListUser: ListUser,username:username });
}
exports.AddUsers = (req, res, next) => {
    res.render('Accout/AddUsers');
}
exports.postUsers = async (req, res, next) => {
    if (req.method == 'POST') {
        let User = new CollectionModel.UserModel();
        User.Username = req.body.Username;
        User.Email = req.body.Email;
        User.PassWord = req.body.PassWord;
        User.Role = req.body.Role;
        User.CapQuyen = false;
        try {
            let user = await User.save();
            res.redirect('/users/ListUsers');
        } catch (error) {
            console.log("loi");
            console.log(error)
        }
    }
}
exports.updateUser= async(req,res,next)=>{
    let id=req.params.id;
    let objUser=await CollectionModel.UserModel.findById(id);
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
        res.redirect('/users/ListUsers');
    } catch (error) {
        console.log(error);
    }
    }
   
    res.render('Accout/UpdateUser',{User:objUser});
}
exports.deleteUser= async(req,res,next)=>{

        let id=req.params.id;
        await CollectionModel.UserModel.deleteOne({_id:req.params.id});
        res.redirect('/users/ListUsers');
      
   }

