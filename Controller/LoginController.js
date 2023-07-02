var CollectionModel=require('../Model/Collection.model');
exports.getFormLogin=(req,res,next)=>{
      res.render("SigninSingout/login");
}
exports.postAccout= async(req,res,next)=>{
  let msg='';
      const{Username,PassWord}=req.body;
      let User=await CollectionModel.UserModel.findOne({Username:Username});
      if(User!=null){
       if(User.PassWord==PassWord){
       if(User.Role=='admin'){
        req.session.userLogin=User;
        res.redirect('/home');
       }else{
        msg='user k dc dn'
        console.log(msg)
        res.redirect('/');
       }
       }else{
        msg='sai mk';
        console.log(msg)
        res.redirect('/');
       } 
      }else {
       msg='User khong ton tai';
       console.log(msg)
       res.redirect('/');
      }
    
}