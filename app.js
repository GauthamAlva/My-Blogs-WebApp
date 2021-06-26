//jshint esversion:6

const express = require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
//intilaizing the database
mongoose.connect("mongodb://localhost:27017/blogDB",{useUnifiedTopology: true, useNewUrlParser: true});
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');






//the array (temp)
// let posts=[];

//setting up the schema for the database
const blogSchema=new mongoose.Schema({
  title:String,
  content:String
});
const Blog= mongoose.model("Blog",blogSchema);
//setting up the starting blog
const start=new Blog({
title:"Start your Blog from today",
content:""
})
// start.save();


app.get("/home",function(req,res){
 //the array will be renderd here
 Blog.find({},function(err,blogs){
   if(!err){
    res.render("home",{homeconst:homeStartingContent,theposts:blogs});
    
   }
  //  res.redirect("/home");
 })


//the old rendering
  // res.render("home",{homeconst:homeStartingContent,theposts:posts});

})


app.get("/about",function(req,res){
  res.render("about",{about:aboutContent})
})

app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent})
})


app.get("/compose",function(req,res){
  res.render("compose");
})


app.post("/compose",function(req,res){
 //storing in the database
 const temp=new Blog({
  title:req.body.postname,
  content:req.body.postitem
  })
 temp.save();


//  let post={
//   posttitle :req.body.postname,
//   postcontent:req.body.postitem
// }

//post pushed to the array
// posts.push(post);
 res.redirect("/home");
})

app.get("/home/:topic",function(req,res){
  let k=_.lowerCase(req.params.topic);
  let r="";
 Blog.find({},function(err,blogi){
   if(!err){
   blogi.forEach(function(bgs){
      r=_.lowerCase(bgs.title);
      if(r == k){
      res.render("post",{title:bgs.title,content:bgs.content});
      //  break;
      }
    })
   }
 })
  
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
