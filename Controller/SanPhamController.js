
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'public/images',
    filename: (res, file, cb) => {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage }).single('image');
var CollectionModel = require('../Model/Collection.model');
exports.getListSP = async (req, res, next) => {
    let id_cte = req.query.id_Category;
    let price = req.query.Price;
    console.log(price);
    if (id_cte == 0 || id_cte == null) {
        if (price != 0) {
            ListProduct = await CollectionModel.ProductModel.find().populate('id_Category').sort({ price: price });
        } else {
            ListProduct = await CollectionModel.ProductModel.find().populate('id_Category');
        }
    } else {
        if (price != 0) {
            ListProduct = await CollectionModel.ProductModel.find({ id_Category: id_cte }).populate('id_Category').sort({ price: price });
        } else {
            ListProduct = await CollectionModel.ProductModel.find({ id_Category: id_cte }).populate('id_Category');
        }
    }

    let ListCategory = await CollectionModel.categoryModel.find();
    console.log(ListProduct);
    res.render('Products/ListSP', { ListProduct: ListProduct, ListCategory: ListCategory });
}
exports.AddSP = async (req, res, next) => {
    let ListCategory = await CollectionModel.categoryModel.find();
    res.render('Products/AddSP', { ListCategory: ListCategory });

}
 exports.updateSP = async (req, res, next) => {
        try {
          let idSP = req.params.idSP;
          let objSP = await CollectionModel.ProductModel.findById(idSP);
          let ListCategory = await CollectionModel.categoryModel.find();
      
          if (req.method == "POST") {
            upload(req, res, async (err) => {
              if (err) {
                console.log(err);
              } else {
                let Anh = "/images/" + req.file.filename;
                let objUpdate = {
                  name: req.body.name,
                  id_Category: req.body.Category,
                  price: req.body.price,
                  description: req.body.description,
                  image: Anh,
                };
                await CollectionModel.ProductModel.findByIdAndUpdate(idSP, objUpdate);
                console.log("victory");
                res.redirect("/SP/ListSP");
              }
            });
          } else {
            res.render("Products/UpdateSP", { Product: objSP, ListCategory: ListCategory });
          }
        } catch (error) {
          console.log("deffic", error);
          next(error);
        }
      };
    
exports.postSP = (req, res, next) => {
    if ((req.method == 'POST')) {
        upload(req, res,async(err) => {
            if (err) {
                console.log(err)
            } else {
                let Anh = '/images/' + req.file.filename
                let modelProduct = new CollectionModel.ProductModel();
                modelProduct.name = req.body.name;
                modelProduct.id_Category = req.body.Category;
                modelProduct.image = Anh;
                modelProduct.description = req.body.description;
                modelProduct.price = req.body.price;
                console.log(modelProduct);
                try {
                    await modelProduct.save();
                    console.log("thanh cong");
                    res.redirect('/SP/ListSP');
                } catch (error) {
                    console.log(error);
                }
            }

        });


    }


}
exports.deleteSP = async (req, res, next) => {
    let id = req.params.id;
    await CollectionModel.ProductModel.deleteOne({ _id: req.params.id }).
        then(() => res.redirect('/SP/ListSP'))
        .catch(err => console.log(err))

}
exports.getCategory = async (req, res, next) => {
    let category = await CollectionModel.categoryModel.find();
    if (req.method == "POST") {
        let objCategory = new CollectionModel.categoryModel();
        objCategory.name = req.body.name;
        try {
            await objCategory.save();
            res.redirect('/sp/ListCategory');
        } catch (error) {
            console.log(error)
        }
    }
    res.render('Products/ListCategory', { ListCategory: category });
}
exports.deleteCate = async (req, res, next) => {
    let idDelete = req.params.id;
    let obj = await CollectionModel.ProductModel.find({ id_Category: idDelete }).populate('id_Category');
    if (obj != null) {
        await CollectionModel.ProductModel.deleteMany({ id_Category: req.params.id });
    }
    await CollectionModel.categoryModel.deleteOne({ _id: req.params.id });
    res.redirect('/SP/ListCategory')

}
exports.Category= async(req,res,next)=>{
    let id=req.params.id;
    let obj= await CollectionModel.categoryModel.findById(id);
    if(req.method=="POST"){
        let objCate= new CollectionModel.categoryModel();
        objCate.name=req.body.name;
        objCate._id=id;
        try {
            await CollectionModel.categoryModel.findByIdAndUpdate(id,objCate);
           res.redirect('/SP/ListCategory')
        } catch (error) {
            console.log(error);
        }    
    }
//     console.log(id);
//    let obj =await CollectionModel.ProductModel.find({id_Category:id}).populate('id_Category');
//    if(obj!=null){
//     await CollectionModel.ProductModel.updateMany({id_Category:req.params.id});
//    } 
//    await CollectionModel.categoryModel.updateOne({_id:req.params.id},{name:req.body.name});
//    res.redirect('/SP/ListCategory')
     res.render('Products/UpdateCate',{obj:obj})
}


exports.DetailSP = async (req, res, next) => {
    let idDetail = req.params.idDetail;
    let ListProduct = await CollectionModel.ProductModel.findById(idDetail).populate('id_Category');
    console.log(ListProduct)
    res.render('Products/DetailSP', { Product: ListProduct });
}

