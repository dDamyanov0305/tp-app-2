const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const verifyToken = require('./users').verifyToken;

router.post('/create',verifyToken, (req, resp) => { // requires: all data without id
	let car = new Car({
		model: req.body.model,
		year: req.body.year,
		specs: req.body.specs
	});

	car.save()
	.then(() => resp.send(`Car added with id: ${car._id}!`))
	.catch((err) => resp.send(err));
});

router.post('/get', (req, resp) => { // requires: id
	Car.findOne({'_id': req.body._id})
	.then(car => {
		resp.send(car);
	})
	.catch(err => resp.send(err));
});

router.get('/all',(req,res)=>{
	Car.find({},(err,cars)=>{
        res.json(cars);
    });
});

router.post('/get_some',(req,res)=>{
	Car.find()
	   .limit(req.body.limit)
	   .skip(req.body.limit*req.body.page)
	   .exec((err,docs)=>{
			res.json(docs);
	})
});

router.post('/update',verifyToken, (req, resp) => { //requires: id + all of the data again
	Car.updateOne(
		{ _id: req.body._id },

		{
			model: req.body.model,
			year: req.body.year,
			specs: req.body.specs
		}
	)
	.then(() => {
		resp.send('Updated car!');
	})
	.catch(err => resp.send(err));
});

router.post('/delete',verifyToken, (req, resp) => { // requires: id
	Car.deleteOne({_id: req.body._id})
	.then(() => {
		resp.send('Removed car!');
	})
	.catch(err => resp.send(err));
});

module.exports = router;
