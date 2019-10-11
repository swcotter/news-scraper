// var cheerio = require("cheerio");
// var request = require("request");
var db = require("../models");

var findArticles = function (found) {
    var articles = [];
    if (found.length > 0) {
        for (let i = 0; i < found.length; i++) {
            newObject = {
                id: found[i]._id,
                title: found[i].title,
                summary: found[i].summary,
                link: found[i].link,
                image: found[i].image,
                date: found[i].date,
                saved: found[i].saved,
                // noteId: "test",
                business: found[i].business,
                codeswitch: found[i].codeswitch,
                health: found[i].health,
                news: found[i].news,
                politics: found[i].politics,
                science: found[i].science,
                technology: found[i].technology,
                world: found[i].world
            };
            articles.push(newObject);
        };
    };
    return articles;
};

module.exports = function (app) {
    app.get("/", function (req, res) {
        var allArticles = {};

        db.Article.find({ $query: { saved: false } }).sort({ date: -1 })
        .then(function (found) {
            var article = findArticles(found)
            allArticles.all = article;
            render(allArticles);
        });

        var render = function (all) {
            res.render("index", all)
        };
    });

    app.get("/saved", function (req, res) {
        var allArticles = {};
        var allNotes = {};

        db.Article.find({ $query: { saved: true } }).sort({ date: -1 })
        .then(function (found) {
            var article = findArticles(found)
            allArticles.all = article;
            // db.Note.find({ $query: { "_id":  } }).sort({ date: -1 })
            // .then(function (found) {)
            render(allArticles);
        });

        var render = function (all) {
            console.log(all);

            res.render("saved", all)
        };
    })
};