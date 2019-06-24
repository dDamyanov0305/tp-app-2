const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const mongoose = require('mongoose');
const db = require('../config/keys').MongoURI;

router.post('/create', (req, resp) => { // requires: all data without id
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

router.post('/update', (req, resp) => { //requires: id + all of the data again
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

router.post('/delete', (req, resp) => { // requires: id
	Car.deleteOne({_id: req.body._id})
	.then(() => {
		resp.send('Removed car!');
	})
	.catch(err => resp.send(err));
});

module.exports = router;
