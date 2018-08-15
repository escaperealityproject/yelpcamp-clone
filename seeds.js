var mongoose = require("mongoose");
var Comment = require('./models/comment');
var Campground = require("./models/campground");

var data = [{
    name: "Cloud's Rest",
    image: "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Camp's Fire",
    image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f4c07ea0eeb4b1_340.jpg",
    description: "Jingalala hu, Jingalala hu HURR!! HURR!!"
  },
  {
    name: "Beach Paradise",
    image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144291f1c67ea4ecbc_340.jpg",
    description: "Thande Thande paani se nahana chahiye, namkeen paani mun mein aaye to thuk ke aa jaana chahiye"
  },
  {
    name: "Hill Crest",
    image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144291f1c67ea4ecbc_340.jpg",
    description: "Ek Garam chai ki piyali ho!!\nKOi usko pilaane waali ho!!"
  }
]

//REMOVE CAMPGROUNDS

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Removed Campgrounds.");

    //Add a few campgrounds
    //inside the remove function because if it's outside, Javascript is asynchronus
    //and doesn't guarantee what order code will be run
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a campground!");
          //Create a comment
          Comment.create({
            text: "This place is great, but I wish there was internet...",
            author: "Homer"
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              //associate comment with a campground in "data"
              campground.comments.push(comment);
              campground.save();
              console.log("Created a new comment");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
