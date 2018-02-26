import * as express from "express";
import { PersonModel } from "./person-model";
import { PersonQuery } from "./person-query-model";

const mongodb = require("mongodb");

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

const app = express();

app.use(mwSample);

/* app.get("/api/person", runApi(async function() {
    return await dalFunction();
})); */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.post('/api/person/getMatches', function (req, res) {
    const searchCriteria: PersonQuery = req.body.candidateParams;

    //const fs = require('fs');
    //const persons: Array<PersonModel> = JSON.parse(fs.readFileSync('peopleMock.json', 'utf8'));
    GetPersons().then(data => HandleData(data, searchCriteria, res));
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
            const retVal = fn();

            if (retVal && retVal.then) {
                retVal.then(data => {
                    res.json(data);
                }).catch(err => {
                    res.json({ error: err.message });
                    res.end();
                });
            }
        }
        catch (err) {
            res.json({ error: err.message });
        }
    }
}

app.listen(3000, function () {
    console.log("Server is running...");
});

function HandleData(data: any, searchCriteria: PersonQuery, res: any) {
    //console.log(data);
    //const persons: Array<PersonModel> = JSON.parse(data);
    const persons: Array<PersonModel> = data;
    const candidatePersons = persons.filter(it => {
        return (!searchCriteria.city || it.city.toLowerCase().includes(searchCriteria.city)) &&
            (!searchCriteria.company || it.company.toLowerCase().includes(searchCriteria.company)) &&
            (!searchCriteria.education || it.education.toLowerCase().includes(searchCriteria.education)) &&
            (!searchCriteria.experience_years_from || Number(it.experience_years) >= searchCriteria.experience_years_from) &&
            (!searchCriteria.experience_years_to || Number(it.experience_years) <= searchCriteria.experience_years_to);
    });
    //console.log(candidatePersons);
    res.json(candidatePersons);
}

const connect: any = promisify(mongodb.MongoClient.connect);

mongodb.Cursor.prototype.toArrayAsync = promisify(mongodb.Cursor.prototype.toArray);

async function GetPersons() {

    console.log("Connecting");
    const client = await connect("mongodb://localhost:27017");
    console.log("Connected");

    const db = client.db("Highlike");

    const contacts = db.collection("people");

    const docs = await contacts.find({}).toArrayAsync();

    // for (const doc of docs) {
    //     console.log(doc);
    // }

    console.log("Closing");
    client.close();
    return docs;
}


function promisify(fn) {
    return function () {
        const args = Array.from(arguments);
        const me = this;

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
    }
}