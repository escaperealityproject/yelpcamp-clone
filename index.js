var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds",function(req,res){
  var campgrounds =[
    {name:"Hula"},
    {name:"Hula re"},
    {name:"Hule hule hule"}
  ];
  res.render("campgrounds",{campgrounds:campgrounds});
})

app.listen(3000, function() {
  console.log("Server is running");
})
