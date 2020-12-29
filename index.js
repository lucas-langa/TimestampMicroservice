// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const parseTime = (req, res, next) => {

    let time = new Date(isNaN(Number(req.params.date))==false ?  Number(req.params.date):req.params.date);
    
    if (time != "Invalid Date") {
      req.time = {
        unix: time.valueOf(),
        utc: time.toUTCString()
      }
    }
    else{
      req.time = {
        error: "Invalid Date"
      }
    } 
  next();
}
app.get('/api/timestamp/',(req, res) => (res.json(
    req.time = {
      unix: new Date().valueOf(),
      utc: new Date()
    }
)))

app.get('/api/timestamp/:date',parseTime, (req, res) => {
  res.json(req.time)
});
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
