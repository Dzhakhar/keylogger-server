var fs = require("fs");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

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

app.get("/getuniquetoken", function(req, res){
  var token = makeid();

  fs.mkdirSync(token);

  res.send(token);
})

app.listen(3000, function(){
  console.log("Server listening on port 3000!");
})
