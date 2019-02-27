var http = require("http");
var expr = require("express");
var path = require("path");
var log = require("morgan");
var bodpars = require("body-parser");

var app = expr();

app.set("views",path.resolve(__dirname,"display"));
app.set("view engine", "ejs" );

var entry = [];
app.locals.entry = entry

app.use(log("dev"));

app.use(bodpars.urlencoded({ extended: false }));

app.get("/",(req,res) => {
res.render("homepage")
});

app.get("/new-entry",(req,res) => {
    res.render("new entry")
 });

 app.post("/new-entry",(req,res) => {
     if(!req.body.title || !req.body.body) {
         res.status(400).send("Must enter a title and a body for entries");
         return;
     }


entry.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
});
res.redirect("/")
})

app.use((req,res)=>{
    res.status(404).render("404");
})

//http.createServer(app).listen(3000, function() {
  //  console.log("Guestbook app running on port 3000.");

    var port = process.env.PORT ||8080;
    var server=app.listen(port,function(){
        console.log("app running on port 8080")
    });
    


    





