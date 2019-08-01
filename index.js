// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {

    const axios = require('axios');


    // Optionally the request above could also be done as
    axios.get('https://www.latimes.com/', {
        //params: {
        //ID: 12345
        //}
    })
        .then(function (timesHomeResponse) {
            res.sendFile(path.join(__dirname, "view.html"));
            console.log(timesHomeResponse);
            //res.writeHead(200, { "Content-Type": "text/html" });


            //res.end(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });


});

// Create New Characters - takes in JSON input

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
