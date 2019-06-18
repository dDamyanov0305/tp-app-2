const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const mongoose = require('mongoose');
const db = require("../config/keys").MongoURI;

router.post('/create', (req, resp) => {
	let car = new Car({
		model: req.body.model,
		year: req.body.year,
		specs: req.body.specs
	});

	car.save()
	.then(() => resp.send(`Car id: ${car._id}!`))
	.catch((err) => resp.send(err));
});

router.post('/get', (req, resp) => {
	Car.findOne({'_id': req.body._id})
	.then(car => {
		resp.send(car); // do front-end stuff here
	})
	.catch(err => console.log(err));
});

router.post('/update', (req, resp) => { //send all of the data again + the id
	Car.updateOne(
		{ _id: req.body._id },

		{
			model: req.body.model,
			year: req.body.year,
			specs: req.body.specs
		}
	)
	.then(() => {
		resp.send(`Updated car!`);
	})
	.catch(err => console.log(err));
});

module.exports = router;
