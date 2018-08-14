var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");

mongoose.connect("mongodb://localhost/yelp_camp");

// Campground.create({
//   name: "Mountain Goat's Rest",
//   image: "https://adventures365.in/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/c/a/camp-oak-view-bir-billing-4.jpg",
//   description:"Huge granite hill,no water/bathrooms"
// },function(err,campground){
//     if(err){
//       console.log("Error");
//     }else{
//       console.log(campground);
//     }
//   });
//
// var campgrounds = [{
//     name: "Salmon Creek",
//     image: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"
//   },
//   {
//     name: "Granite Hill",
//     image: "https://invinciblengo.org/photos/event/slider/mount-abu-trekking-camp-aravalli-hills-rajasthan-nbMgzbA-1440x810.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image: "https://adventures365.in/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/c/a/camp-oak-view-bir-billing-4.jpg"
//   }
// ];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log("Error");
    } else {
      res.render("index", {
        campgrounds: campgrounds
      });
    }
  })
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
})

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

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCamp) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {
        campground: foundCamp
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
