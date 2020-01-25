// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Endpoint requested without date_string - Return Current Date
/*app.get('/api/timestamp/', function(req, res) {
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
  console.log("Get current date!");
});*/

// My endpoint
app.get("/api/timestamp/:date_string?", function(req, res) {
  // Empty date_string
  if (req.params.date_string === undefined) {
    let date = new Date();
    res.json({unix: date.getTime(), utc: date.toUTCString()});
    console.log("Get current date!");
  } else {
    let myDate = req.params.date_string;
    // Check for valid UNIX date_string
    if (/[0-9]{5,}/.test(myDate)) {
      myDate = parseInt(myDate);
      res.json({unix: parseInt(myDate), utc: new Date(myDate).toUTCString()});
    } else {
      let date = new Date(req.params.date_string);
      console.log(date);
      if (date.toString() === "Invalid Date") {
        res.json({error: "Invalid Date"});
      } else {
        // Valid date string parameter
        res.json({unix: date.getTime(), utc: date.toUTCString()});
      }
    }
  }  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});