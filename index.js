var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");

seedDB();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX - SHOW ALL CAMPGROUNDS

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log("Error");
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  })
});

app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
})

//CREATE - NEW CAMPGROUNDS

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCamp = {
    name: name,
    image: image,
    description: description
  }
  Campground.create(newCamp, function(err) {
    if (err) {
      console.log("Error");
    } else {
      res.redirect('/campgrounds');
    }
  });
});

//SHOW - show more info

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
    // console.log(foundCamp);
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {
        campground: foundCamp
      });
    }
  })
})

//===============================
//COMMENTS ROUTES
//===============================

app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      });
    }
  })
})

app.post("/campgrounds/:id/comments", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
    } else {
      Comment.create(req.body.comment,function(err, comment) {
         if (err) {
          console.log(err)
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id)
        }
      });
    }
  })
})

app.listen(3000, function() {
  console.log("Server is running");
  setInterval(function() {
    console.log("Server is running");
  }, 5000);
})
