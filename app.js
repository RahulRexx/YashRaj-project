require("./config/config.js")
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var flash = require("connect-flash");
// var mongoose = require("mongoose");
var {mongoose} = require("./db/mongoose.js");
var passport = require("passport");
var localStrategy = require("passport-local");
var nodemailer = require('nodemailer');
var request = require('request');


// // let uri = "mongodb+srv://YashRaj:Yash1998@blogapp.shvdu.mongodb.net/yelpcamp?retryWrites=true&w=majority";
// let uri = 'mongodb+srv://rahuluser:rahulraj@todoapp-kzfjc.mongodb.net/yashraj?retryWrites=true';

// // mongoose.connect(uri, { useNewUrlParser: true });

// // let uri = 'mongodb://localhost/yashrajYelpCamp' ;

// let newUri = uri || process.env.MONGODB_URI ;

// mongoose.connect(newUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

var Campground = require("./models/campground");
var Comment = require("./models/comment")
var User = require("./models/user");
var seedDB = require("./seeds");
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comment");
var campRoutes = require("./routes/campground");
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seedDB();

app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campRoutes);

// let port = 3000 ||  ;

// process.env.IP

app.listen(process.env.PORT, function () {
    console.log("yelpcamp started");
})