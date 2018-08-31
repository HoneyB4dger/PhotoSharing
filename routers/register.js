var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

 router.get('/', function(req, res) {
 	res.render('user_register/register', {req: req, error : null});
 });

router.post('/', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;

  db = new sqlite3.Database('./database/photosharing.db', (err) => {
    if (err) {
      console.error(err.message);
    }

		if(email == ""){
			var data = {
			    req: req,
			    error: "Please add register"
			}
			res.render('user_register/register', data);
		} else {
      db.all(`SELECT id FROM users WHERE email = "${email}";`, function(err, record){
        if (record.length == 0) {
          const query = `INSERT INTO users (email, password, name) VALUES ("${email}", "${password}", "${name}")`;
          db.run(query);
          db.close();
          res.redirect('/user');
        } else {
          var data = {
    			    req: req,
    			    error: "User with this email already exists"
    			}
    			res.render('user_register/register', data);
        }
      });
  	}
  });

});

module.exports = router;
