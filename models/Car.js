const mongoose = require('mongoose');
const ObjectID = mongoose.SchemaTypes.ObjectId;

const CarSchema = new mongoose.Schema({
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
    },
	img:{
		type:String
	}
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;

// {
    // "model": "audi",
    // "year": 2019,
    // "specs": {
    // 	"enginePower": 3000,
    // 	"engineLiters": 200,
    // 	"doors": 4,
    // 	"seats": 5,
    // 	"maxSpeed": 400
    // }
// }
