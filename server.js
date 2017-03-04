var fs = require("fs");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var allowedWordLength = 20;

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    if(fs.existsSync(text)){
      return makeid();
    }

    return text;
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res){
  res.send("Hello, World!");
})

// routes

app.get("/getuniquetoken", function(req, res){
  var token = makeid();

  fs.mkdirSync(token);

  res.send(token);
})

app.get("/allowedwordlength", function(req, res){
  res.send(allowedWordLength);
})

app.get("/sendchar", function(req, res){
  var payload = req.query.payload;
  var token = req.query.token;

  if(fs.existsSync(token)){
    fs.writeFileSync(token + "/logs.txt", payload, function(err){
      if(err){
        res.send("error");
      } else {
        res.send("success");
      }
    });
  } else {
      res.send("incorrect token");
  }
})


// running the server
app.listen(3000, function(){
  console.log("Server listening on port 3000!");
})
