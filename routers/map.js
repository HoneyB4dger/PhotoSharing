var express = require('express');
var router = express.Router();
var fs = require('fs');
var re = require('re');
const uuidv5 = require('uuid/v5');
const sqlite3 = require('sqlite3').verbose();

//var filesPath = __dirname + "/../files/";
var filesPath = './public/images/';

router.get('/', function(req, res, next){

	db = new sqlite3.Database('./database/photosharing.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    db.all('SELECT photos.* FROM photos', function(err, photos){
			if(err){ return next(err); }
			db.close();
			res.render('./map/map', {photos: photos, req: req});
		});
	});
});

router.get('/:id', function(req, res, next){
	var id = req.params.id;

	db = new sqlite3.Database('./database/photosharing.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    db.all(`SELECT photos.* FROM photos WHERE id = ${id}`, function(err, photos){
			if(err){ return next(err); }
			db.close();
			res.render('./map/map', {photos: photos, req: req});
		});
	});
});

module.exports = router;
