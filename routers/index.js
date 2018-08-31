var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', function(req, res, next){

  db = new sqlite3.Database('./database/photosharing.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    db.all('SELECT photos.*, users.*, photos.id AS photoId FROM photos LEFT JOIN users ON photos.user_id = users.id ORDER BY photos.id DESC', function(err, photos){
      if(err){ return next(err); }
      db.close();
      res.render('home/index', {photos: photos, req: req});
    });
  });

});



module.exports = router;
