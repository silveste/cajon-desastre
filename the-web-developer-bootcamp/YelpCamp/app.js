/*jslint node: true */
"use strict";


/* CONFIG SECTION ------------------------------------------------------------*/
// required packages
var express            = require("express"),
    app                = express(),

    bodyParser         = require("body-parser"),
    flash              = require("connect-flash"),
    LocalStrategy      = require("passport-local"),
    methodOverride     = require("method-override"),
    mongoose           = require("mongoose"),
    passport           = require("passport"),

    Campground         = require("./models/campground"),
    Comment            = require("./models/comment"),
    User               = require("./models/user"),
    seedDB             = require("./seeds");

var commentRoutes      = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

//Using body-parser to parse post requests
app.use(bodyParser.urlencoded({extended: true}));

//Set public directory to server assests
app.use(express.static(__dirname + "/public"));

//Set ejs as default template egine, avoiding write extension when call files
app.set("view engine", "ejs");

// Set method override to fix issues with forms and verbs different thant post
app.use(methodOverride("_method"));

// Set flash to deliver messages to the user
app.use(flash());

// Passport configuration
app.use(require("express-session")({
  secret: "Que tengo que tengo que tengo de tooo!!!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Adding user to all routes
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.messages = [
    { type: "danger", text: req.flash("error")},
    { type: "success", text: req.flash("success")},
    { type: "info", text: req.flash("info")},
    { type: "warning", text: req.flash("warning")}
  ];
  next();
});
//Conecting database
mongoose.connect("mongodb://localhost/yelpcamp");

//Seeding database for testing purposes
//seedDB();

/*END CONFIG SECTION ---------------------------------------------------------*/

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// Listener C9
// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("YelpCamp server running on https://" + process.env.C9_HOSTNAME);
// });
// Listener local computer
app.listen(3000, function(){
  console.log("YelpCamp server running on http://localhost:3000");
});
