'use strict';

var express = require('express');
var cors = require('cors');
const multer = require("multer")
const upload = multer({limits: {fileSize: 10000000}});

// require and use "multer"...

var app = express();

//app.listen(3000, ()=>{console.log("listening on port 3000");});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/upload-file", upload.single("file"), (req, res, next)=>{
    if(req.file && req.file.size){
        res.json({fileSize: req.file.size});
    }
    else{res.json({error: "error with file upload"});}
});


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
