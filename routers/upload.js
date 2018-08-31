var express = require('express');
var router = express.Router();
var fs = require('fs');
var re = require('re');
const uuidv1 = require('uuid/v1')
const sqlite3 = require('sqlite3').verbose();;

//var filesPath = __dirname + "/../files/";
var filesPath = './public/images/';

router.get('/', function(req, res){

	fs.readdir(filesPath, function(err, files){
    	res.locals.files = files;
			res.render('./upload/upload', {req: req});
  	});
});

router.post("/", function(req, res){
  var userId = req.session.userId;
  var upload = req.files.upload;
  var caption = req.body.caption;
  var lat = req.body.lat;
  var lng = req.body.lng;
  //var filename = upload.originalname;
	var re = /(?:\.([^.]+))?$/;
  var filename = uuidv1() + '.' + re.exec(upload.originalname)[1];
	console.log(filename)

  fs.rename(upload.path, filesPath + filename, function(err){
    if(err){
      res.send("Something went wrong!");
    } else {

		db = new sqlite3.Database('./database/photosharing.db', (err) => {
	    if (err) {
	      console.error(err.message);
	    }
	    db.run(`INSERT INTO photos (user_id, caption, filename, lat, lng) VALUES ("${userId}", "${caption}", "${filename}", ${lat}, ${lng})`, function(){
				db.close();
				res.redirect("/");
	    	console.log(userId + " " + caption + " " + filename);
	    });
	  });
    }
  });

});


module.exports = router;
