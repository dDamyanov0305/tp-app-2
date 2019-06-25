const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const verifyToken = require('./users').verifyToken;
const jwt = require('jsonwebtoken');
const imgur = require('imgur');

imgur.setAPIUrl('link.com');

function addCar(model, year, specs, img, imgLink) {
	let car = new Car({
		model,
		year,
		specs,
		img,
		imgLink
	});

	car.save()
	.then(() => resp.send(`Car added with id: ${car._id}!`))
	.catch((err) => resp.send(err));
}

router.post('/create', verifyToken, (req, resp) => { // requires: all data without id
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err) {
			console.log(err, authData);
		  	resp.sendStatus(403);
		} else {
			imgur.uploadBase64(req.body.img)
			.then(result => {
				let prms = req.body;
				addCar(prms.model, prms.year, prms.specs, prms.img, result.data.link);
			})
			.catch(err => console.log(err));
		}
	});
});

router.post('/get', (req, resp) => { // requires: id
	Car.findOne({'_id': req.body._id})
	.then(car => {
		resp.send(car);
	})
	.catch(err => resp.send(err));
});

router.get('/all', (req, res) => {
	Car.find({}, (err, cars) => {
        res.json(cars);
    });
});

router.post('/get_some', (req, res) => {
	Car.find()
	   .limit(req.body.limit)
	   .skip(req.body.limit*req.body.page)
	   .exec((err,docs)=>{
			res.json(docs);
	})
});

router.post('/update', verifyToken, (req, resp) => { //requires: id + all of the data again
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err) {
		  res.sendStatus(403);
		} else {
			Car.findOne({'_id': req.body._id})
			.then(car => {
				let img, imgLink;
				if (car.img == req.body.img) {
					img = car.img;
					imgLink = car.imgLink;
				} else {

				}
				Car.updateOne(
					{ _id: req.body._id },

					{
						model: req.body.model,
						year: req.body.year,
						specs: req.body.specs,
						img: img,
						imgLink: imgLink
					}
				)
			})
			.then(() => {
				resp.send('Updated car!');
			})
			.catch(err => resp.send(err));
		}
	});

});

router.post('/delete', verifyToken, (req, resp) => { // requires: id
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err) {
		  res.sendStatus(403);
		} else {
			Car.deleteOne({_id: req.body._id})
			.then(() => {
				resp.send('Removed car!');
			})
			.catch(err => resp.send(err));
		}
	});

});

module.exports = router;
