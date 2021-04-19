var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(function (req, res, next) {
  console.log(`${new Date()} - ${req.method} request for ${req.url}`);
  next();
});
app.use(express.static('../static'));
app.use(bodyParser.urlencoded({
  extended: false
}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const dir = "./models/" + req.body.name
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, {
          recursive: true
        }, error => cb(error, dir))
      }
      return cb(null, dir)
    })
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
})
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.htm");
})

app.get('/files', function (req, res) {
  try {
    var files = fs.readdirSync(__dirname + "/models");
    res.send(files)
  } catch (e) {
    res.send([])
  }
})
app.get('/testData', function (req, res) {
  res.sendFile(__dirname + "/load-dataset.json")
})
// app.get('/algo/:id', function (req, res) {
//   res.sendFile(__dirname + "/models/" + req.params.id + "/Model.js")
// })
app.get('/:id/:filename', function (req, res) {
  res.sendFile(__dirname + "/models/" + req.params.id + "/" + req.params.filename)
})
app.post("/file_upload", upload.array("files", 100), (req, res) => {

  try {
    res.redirect("/")
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//Change the port here
//
var server = app.listen(8083, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
