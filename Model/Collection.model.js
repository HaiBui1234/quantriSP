
var Database=require('./Database.model');

const UsersSchema=new Database.mongoose.Schema(
    {
        Username:{type:String,required:true},
        Email:{type:String,required:true},
        PassWord:{type:String,required:true},
        CapQuyen:{type:Boolean,required:true},
        Role:{type:String,required:true}
    },
    {
        collection:'Users'
    }
)
let UserModel=Database.mongoose.model("UserModel",UsersSchema); 
const ProductsSchema=new Database.mongoose.Schema(
    {
       //colum 
       name:{type:String,required:true},
       price:{type:Number,required:true},
       image:{type:String,required:true},
       description:{type:String,required:true},
       id_Category:{type:Database.mongoose.Schema.Types.ObjectId,ref:'categoryModel'}
    },
    {
        collection:'Products'
    }
);
// create model
let ProductModel=Database.mongoose.model("ProductModel",ProductsSchema);

const CategorySchema=new Database.mongoose.Schema(
    {
     name:{type:String,required:true}
    },
    {
        collection:'Categorys'
    }
)
let categoryModel=Database.mongoose.model("categoryModel",CategorySchema);
module.exports={ProductModel,categoryModel,UserModel};