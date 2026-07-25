import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String , required: true},
    description:{type:String , required: true},
    price:{type:Number , required: true},
    image:{type:Array , required: true},
    category:{type:String , required: true},
    subCategory:{type:String , required: true},
    sizes:{type:Array , required: true},
    bestSeller:{type:Boolean },
    date:{type:Number , required: true}
})
// ponytail: cast to Model<any> to collapse the models.x || model() union that TS reads as not-callable
const productModel: mongoose.Model<any> =mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;