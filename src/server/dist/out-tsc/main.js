"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
function mwSample(req, res, next) {
    console.log('Running sample middleware...');
    /* if (false) {
        res.json({
            error: "..."
        });
        return;
    } */
    next();
}
var app = express();
app.use(mwSample);
/* app.get("/api/person", runApi(async function() {
    return await dalFunction();
})); */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var bodyParser = require("body-parser"); // Body parser for fetch posted data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.post('/api/person/Matches', function (req, res) {
    var searchCriteria = req.body.candidateParams;
    var fs = require('fs');
    var persons = JSON.parse(fs.readFileSync('peopleMock.json', 'utf8'));
    console.log(persons);
    var candidatePersons = persons.filter(function (it) {
        return (!searchCriteria.city || it.city.toLowerCase().includes(searchCriteria.city)) &&
            (!searchCriteria.company || it.company.toLowerCase().includes(searchCriteria.company)) &&
            (!searchCriteria.education || it.education.toLowerCase().includes(searchCriteria.education)) &&
            (!searchCriteria.experience_years_from || Number(it.experience_years) >= searchCriteria.experience_years_from) &&
            (!searchCriteria.experience_years_to || Number(it.experience_years) <= searchCriteria.experience_years_to);
    });
    console.log(candidatePersons);
    res.json(candidatePersons);
});
function runApi(fn) {
    return function (req, res) {
        try {
            var retVal = fn();
            if (retVal && retVal.then) {
                retVal.then(function (data) {
                    res.json(data);
                }).catch(function (err) {
                    res.json({ error: err.message });
                    res.end();
                });
            }
        }
        catch (err) {
            res.json({ error: err.message });
        }
    };
}
app.listen(3000, function () {
    console.log("Server is running...");
});
//# sourceMappingURL=main.js.map