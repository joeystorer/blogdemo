var express = require("express");
app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//App Config
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");  
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type:Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// RESTful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs", function(req, res){
     Blog.find({}, function(err, blogs){
         if(err){
             console.log("Error!");
           }  else{
                 res.render("index", {blogs : blogs});
             }
         
     });
});
// NEW ROUTE
// CREATE ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

app.listen(3000, () => console.log("server has started!"));