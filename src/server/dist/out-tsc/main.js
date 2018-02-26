"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
app.post('/api/person/getMatches', function (req, res) {
    var searchCriteria = req.body.candidateParams;
    //const fs = require('fs');
    //const persons: Array<PersonModel> = JSON.parse(fs.readFileSync('peopleMock.json', 'utf8'));
    GetPersons(searchCriteria).then(function (data) { return HandleData(data, searchCriteria, res); });
    //console.log(personsJson);
    //const persons: Array<PersonModel> = JSON.parse(personsJson);
    //console.log(persons);
    // const candidatePersons = persons.filter(it => {
    //     return (!searchCriteria.city || it.city.toLowerCase().includes(searchCriteria.city)) &&
    //            (!searchCriteria.company || it.company.toLowerCase().includes(searchCriteria.company)) &&
    //            (!searchCriteria.education || it.education.toLowerCase().includes(searchCriteria.education)) &&
    //            (!searchCriteria.experience_years_from || Number(it.experience_years) >= searchCriteria.experience_years_from ) &&
    //            (!searchCriteria.experience_years_to || Number(it.experience_years) <= searchCriteria.experience_years_to )   ;
    //   });
    // //console.log(candidatePersons);
    // res.json(candidatePersons);
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
function HandleData(data, searchCriteria, res) {
    //console.log(data);
    //const persons: Array<PersonModel> = JSON.parse(data);
    var persons = data;
    // const candidatePersons = persons.filter(it => {
    //     return (!searchCriteria.city || it.city.toLowerCase().includes(searchCriteria.city)) &&
    //         (!searchCriteria.company || it.company.toLowerCase().includes(searchCriteria.company)) &&
    //         (!searchCriteria.education || it.education.toLowerCase().includes(searchCriteria.education)) &&
    //         (!searchCriteria.experience_years_from || Number(it.experience_years) >= searchCriteria.experience_years_from) &&
    //         (!searchCriteria.experience_years_to || Number(it.experience_years) <= searchCriteria.experience_years_to);
    // });
    console.log(persons);
    res.json(persons);
}
var mongodb = require("mongodb");
var connect = promisify(mongodb.MongoClient.connect);
mongodb.Cursor.prototype.toArrayAsync = promisify(mongodb.Cursor.prototype.toArray);
function GetPersons(searchCriteria) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, contacts, objQuery, docs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Connecting");
                    return [4 /*yield*/, connect("mongodb://localhost:27017")];
                case 1:
                    client = _a.sent();
                    console.log("Connected");
                    db = client.db("Highlike");
                    contacts = db.collection("people");
                    objQuery = buildQuery(searchCriteria);
                    docs = [];
                    if (!objQuery) return [3 /*break*/, 3];
                    return [4 /*yield*/, contacts.find(objQuery).toArrayAsync()];
                case 2:
                    docs = _a.sent();
                    _a.label = 3;
                case 3:
                    // for (const doc of docs) {
                    //     console.log(doc);
                    // }
                    console.log("Closing");
                    client.close();
                    return [2 /*return*/, docs];
            }
        });
    });
}
function buildQuery(searchCriteria) {
    var searchCriteriaArray = [];
    Object.setPrototypeOf(searchCriteria, null);
    if (searchCriteria.city) {
        searchCriteriaArray.push({ city: searchCriteria.city });
    }
    if (searchCriteria.education) {
        searchCriteriaArray.push({ education: searchCriteria.education });
    }
    if (searchCriteria.company) {
        searchCriteriaArray.push({ company: searchCriteria.company });
    }
    // if (searchCriteria.experience_years_from && Number(searchCriteria.experience_years_from) > 0 ) {
    //     searchCriteriaArray.push({experience_years: {$gte :Number(searchCriteria.experience_years_from)}})
    // }
    // if (searchCriteria.experience_years_to && Number(searchCriteria.experience_years_to) > 0 && Number(searchCriteria.experience_years_to) < 100) {
    //     searchCriteriaArray.push({experience_years: {$lte:Number(searchCriteria.experience_years_to)}})
    // }
    if (searchCriteriaArray) {
        return { $or: searchCriteriaArray };
    }
    return {};
}
function promisify(fn) {
    return function () {
        var args = Array.from(arguments);
        var me = this;
        return new Promise(function (resolve, reject) {
            function callback(err, retVal) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(retVal);
            }
            args.push(callback);
            fn.apply(me, args);
        });
    };
}
//# sourceMappingURL=main.js.map