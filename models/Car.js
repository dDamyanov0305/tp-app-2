const mongoose = require('mongoose');
const ObjectID = mongoose.SchemaTypes.ObjectId;

const CarSchema = new mongoose.Schema({
    brandID:{
        type:ObjectID,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    specs:{
        enginePower:Number,
        engineLiters:Number,
        doors:Number,
        seats:Number,
        maxSpeed:Number
    }
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
