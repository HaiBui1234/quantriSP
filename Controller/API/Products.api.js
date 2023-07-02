var CollectionModel=require('../../Model/Collection.model');
exports.apiListSP= async(req,res,next)=>{
    try {
        let ListCategory= await CollectionModel.ProductModel.find().populate('id_Category');
        if(ListCategory){
            return res.status(200).json(
                
                    ListCategory
                
            )
        }else{
            return res.status(204).json(
                {
                    msg:'Loi 204'
                }
            )
        }
    } catch (error) {
        return res.status(error.status).json(
            {
                msg:error.message
            }
        )
    }
    
}