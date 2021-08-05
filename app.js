const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/city.html");

});

app.post("/", function(req,res){

  const query = req.body.city; //from request came frm html page...frm dt body of city named property
  const apikey = "85b72e1cb3e61f60afba6cd869763fd4"; //take default key frm the weather site
  const unit = "metric"; //for unit as degree celcius
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+",uk&appid="+apikey+"&units="+unit+"";

  https.get(url, function(response) {

    console.log(response.statuscode);

          response.on("data", function(data) {
          const weatherData = JSON.parse(data);
          console.log(weatherData);//to display fetched data on console
          const temp = weatherData.main.temp;
          res.send("The climate temperature of "+query+" is "+temp+" degree celcius. ");
          });

  });



});



app.listen(3070, function(){
  console.log("server is running on port 3070 successfully.....");
});
