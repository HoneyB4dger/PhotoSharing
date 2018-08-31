var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', function(req, res){

  if(req.session.userId){
    db = new sqlite3.Database('./database/photosharing.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      if(err){ return next(err); }

      db.all("SELECT * FROM users WHERE id = ?", [req.session.userId], function(err, records){
        if(err){ return next(err); }
        db.close();
        console.log(records);
        var name = req.session.name;
        res.render('./user', {name: name, req: req});
      });

    });
  } else {
    res.redirect('/user/login');
  }
});


router.get('/:id/:name', function(req, res, next){
  var id = req.params.id;
  var name = req.params.name;

  db = new sqlite3.Database('./database/photosharing.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    db.all('SELECT photos.*, users.*, photos.id AS photoId FROM photos LEFT JOIN users ON photos.user_id = users.id WHERE user_id = ?',[id], function(err, photos){
      if(err){ return next(err); }
      db.close();
      res.render('./user/profile', {
        req: req,
        id: id,
        name : name,
        photos: photos
        });
    });
  });


});

router.get('/login', function(req, res){
	  res.render('./user/login', {
		  req: req,
    	error: null,
  	});
});

router.get('/logout', function(req, res){
  req.session.destroy(function() {
    res.redirect(req.baseUrl + "/");
  });
});

router.post('/login', function(req, res, next){
  var username = req.body.email;
  var password = req.body.password;

  db = new sqlite3.Database('./database/photosharing.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    db.all('SELECT * FROM users WHERE email = ? AND password = ?', [username, password], function(err, records){
      if(err){ next(err); }

      if(records.length > 0){
        req.session.userId = records[0].id;
        req.session.name = records[0].name;
        console.log("Logged in!", records[0]);
        res.redirect('/index');
      } else {
        var data = {
          req: req,
          error: "Username or password are not matching!"
        }
        res.render("user/login", data);
      }
    });

  });

});

module.exports = router;
