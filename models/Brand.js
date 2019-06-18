const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
   id:{
	   type:Number
   }
   name:{
       type:String,
       required:true
   },
   estYear:{
       type:Date,
       default: Date.now
   },
   factories:{
       type:[String],
       default:undefined
   }
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
