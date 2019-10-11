var axios = require("axios");
var cheerio = require("cheerio");
// var request = require("request");
var db = require("../models");

var axiosCall = function (category) {
    var base = "https://www.npr.org/sections/";
    var url = base + category + "/"

    // First, we grab the body of the html with axios
    axios.get(url).then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        $("article.item").each(function (i, element) {
            var result = {};

            result.title = $(element)
                .find('.item-info')
                .find('.title')
                .find('a')
                .text();
            result.link = $(element)
                .find('.item-info')
                .find('.title')
                .children()
                .attr("href");
            result.summary = $(element)
                .find('.item-info')
                .find('.teaser')
                .find('a')
                .text();
            result.image = $(element)
                .find('.item-image')
                .find('.imagewrap')
                .find('a')
                .find('img')
                .attr("src");
            result.date = $(element)
                .find('.item-info')
                .find('.teaser')
                .find('a')
                .find('time')
                .attr("datetime");
            result[category] = true;  
            
            db.Article.create(result)
            .then(function (article) {
                console.log(article);
            }).catch(function(err) {
                console.log(err);
            })
        });
    });
}

module.exports = function (app) {
    // A GET route for scraping the npr news   website
    app.get("/scrape/:category", function (req, res) {
        axiosCall(req.params.category);
        console.log(req.params.category);
        // res.redirect("/");
        // res.ren("index");
        res.json()

    });

    app.post("/save/:id", function (req, res) {
        // console.log("saved!", req.params.id)
        db.Article.updateOne({
            "_id": req.params.id
        },{
            $set: { "saved": true }
        }).then(function(found) {
            // console.log(found);
            res.json(found);
        });
    });
    app.post("/unsave/:id", function (req, res) {
        // console.log("unsaved!", req.params.id)
        db.Article.updateOne({
            "_id": req.params.id
        },{
            $set: { "saved": false }
        }).then(function(found) {
            // console.log(found);
            res.json(found);
        });
    });

    app.get("/api/clear/:category", (req, res) => {
        var clear = req.params.category + ": true";
        console.log(clear);
        // db.Article.drop();
        db.Article.remove({ 
            news: true
        }).then(function () {
            res.json("documents removed from article collection");
        })
    });

    app.get("/api/notes/all", function (req, res) {

        db.Note.find({})
            .then(function (response) {
                res.json(response)
                // res.json(response)
            })
    });
    app.get("/api/articles/all", function (req, res) {

        db.Article.find({})
            .then(function (response) {
                res.json(response)
                // res.json(response)
            })
    });

    app.get("/api/populate", function (req, res) {

        db.Article.find({ _id: "5d3d0c753e624aa0f4ebf808" })
        .populate("note")
        .then(function(dbLibrary) {
            // If any Libraries are found, send them to the client with any associated Books
            res.json(dbLibrary);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
    });

    app.post("/api/create/note/:id", function (req, res){
        console.log(req.body);

        db.Note.create(req.body)
            .then(function (dbNote) {
                console.log("dbNote", dbNote)
                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    noteId: dbNote
                }, {
                    new: true
                });
            })
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });

    });

};