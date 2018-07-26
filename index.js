var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [{
    name: "Salmon Creek",
    image: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://invinciblengo.org/photos/event/slider/mount-abu-trekking-camp-aravalli-hills-rajasthan-nbMgzbA-1440x810.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://adventures365.in/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/c/a/camp-oak-view-bir-billing-4.jpg"
  }
];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {
    campgrounds: campgrounds
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
})

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCamp = {
    name: name,
    image: image
  }
  campgrounds.push(newCamp);
  res.redirect('/campgrounds');
});

app.listen(3000, function() {
  console.log("Server is running");
})
