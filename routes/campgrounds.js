var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//INDEX - SHOW ALL CAMPGROUNDS

router.get("/", function(req, res) {
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

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
})

//CREATE - NEW CAMPGROUNDS

router.post("/", function(req, res) {
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

router.get("/:id", function(req, res) {
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

module.exports = router;
