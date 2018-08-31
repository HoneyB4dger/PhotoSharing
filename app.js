var express = require('express');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var multer = require('multer');
const sqlite3 = require('sqlite3').verbose();

//  =================
//  = Setup the app =
//  =================

// The app itself
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  ============================
//  = Middleware configuration =
//  ============================

// Setup serving static assets
app.use(express.static(path.join(__dirname, 'public')));

// Add session support
app.use(session({
  secret: '...', // TODO: Change this
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

// Setup bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Setup Multer
app.use(multer({
  dest: __dirname + '/public/images'
}));


let db = new sqlite3.Database('./database/photosharing.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS photos ( \
        id INTEGER PRIMARY KEY AUTOINCREMENT , \
        user_id INTEGER, \
        caption TEXT DEFAULT '', \
        filename varchar(255) DEFAULT NULL, \
        lat decimal(13,10) DEFAULT 0.1, \
        lng decimal(13,10) DEFAULT 0.1 \
      )");

    db.run("CREATE TABLE IF NOT EXISTS users ( \
      id INTEGER PRIMARY KEY AUTOINCREMENT , \
      email varchar(255) NOT NULL DEFAULT '', \
      password varchar(255) NOT NULL, \
      name varchar(255) DEFAULT NULL \
    )");
});


//  ===========
//  = Routers =
//  ===========

//Home router
var index = require('./routers/index');
app.use('/index', index);

//Inloggen
var userLogin = require('./routers/user');
app.use('/user', userLogin);

//register
var userRegister = require('./routers/register');
app.use('/register', userRegister);

//Image upload
var upload = require('./routers/upload');
app.use('/upload', upload);

//Map view`
var map = require('./routers/map');
app.use('/map', map);

app.get('/', function(req, res){
  res.redirect('/index');
});

//  =================
//  = Start the app =
//  =================

app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});

app.on('SIGINT', () => {
    db.close();
});
