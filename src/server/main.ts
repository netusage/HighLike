import * as express from "express";
import { PersonModel } from "./person-model";
import { PersonQuery } from "./person-query-model";
import { ProfileQuery } from "./profile-query-model";
import { ProfileModel } from "./profile-model";

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

app.post('/api/person/Matches',function(req,res){
    const searchCriteria: PersonQuery = req.body.candidateParams;

    //const fs = require('fs');
    //const persons: Array<PersonModel> = JSON.parse(fs.readFileSync('peopleMock.json', 'utf8'));
    GetPersons(searchCriteria).then(data => HandleData(data, searchCriteria, res));
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

app.post('/api/profile/generate', function (req, res) {
    const searchCriteria: ProfileQuery = req.body.profileQuery;
    generateProfile().then(data => handleProfile(data, searchCriteria, res));
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
    // const candidatePersons = persons.filter(it => {
    //     return (!searchCriteria.city || it.city.toLowerCase().includes(searchCriteria.city)) &&
    //         (!searchCriteria.company || it.company.toLowerCase().includes(searchCriteria.company)) &&
    //         (!searchCriteria.education || it.education.toLowerCase().includes(searchCriteria.education)) &&
    //         (!searchCriteria.experience_years_from || Number(it.experience_years) >= searchCriteria.experience_years_from) &&
    //         (!searchCriteria.experience_years_to || Number(it.experience_years) <= searchCriteria.experience_years_to);
    // });
    // console.log(persons);
    res.json(persons);
}

const connect: any = promisify(mongodb.MongoClient.connect);

mongodb.Cursor.prototype.toArrayAsync = promisify(mongodb.Cursor.prototype.toArray);

async function GetPersons(searchCriteria) {


    console.log("Connecting");
    const client = await connect("mongodb://localhost:27017");
    console.log("Connected");

    const db = client.db("Highlike");

    const contacts = db.collection("people");

    
    const objQuery = buildQuery(searchCriteria);
    // const docs = await contacts.find({$or:[{city:"תל אביב"}, {education:"תוכנה"}]}).toArrayAsync();
    let docs: Array<PersonModel> = [];
    if (objQuery){
        docs = await contacts.find(objQuery).toArrayAsync();        
    }


    // for (const doc of docs) {
    //     console.log(doc);
    // }
    //onsole.log(objQuery);
    //console.log(docs);
    //console.log("Closing");
    client.close();

    CalcRatio(docs, searchCriteria);
    const docs1 = docs.sort((obj1:PersonModel, obj2:PersonModel) => {        
        // Descending: first age less than the previous
        return obj2.matchRatio - obj1.matchRatio;        
    });;
    
    return docs1;    
}

function CalcRatio(docs: Array<PersonModel>, searchCriteria: PersonQuery) {
    for (let el of docs) {
        let matchesCounter = 0;
        let fieldCounter = 0;
        if (searchCriteria.city) {
            if (el.city.toLowerCase() == searchCriteria.city.toLowerCase() ) {
                matchesCounter++;
            }
            fieldCounter++;
        }
    
        if (searchCriteria.education) {
            if  (el.education.toLowerCase() == searchCriteria.education.toLowerCase()) {
                matchesCounter++;
            }
            fieldCounter++;
        }
    
        if (searchCriteria.company) {
            if(el.company.toLowerCase() == searchCriteria.company.toLowerCase()) {
                matchesCounter++;
            }
            fieldCounter++;
        }
        if (fieldCounter > 0) {
            el.matchRatio = matchesCounter * 100 / fieldCounter;
        }
        else {
            el.matchRatio = 0;
        }

    }
}
async function generateProfile() {

    console.log("Connecting");
    const client = await connect("mongodb://localhost:27017");
    console.log("Connected");

    const db = client.db("Highlike");

    const contacts = db.collection("employees");

    const docs = await contacts.find({}).toArrayAsync();

    // for (const doc of docs) {
    //     console.log(doc);
    // }

    
    console.log("Closing");
    client.close();
    console.log(docs);
        
    return docs;
    
}

function handleProfile(persons: Array<PersonModel>, searchCriteria: ProfileQuery, res: any) {
    const profile = new ProfileModel();
    const personCount = persons.length;
    console.log(personCount);

    let emptyProfile = true;

    const mostFrequentCity = findMostFrequent(persons.map(person => person.city));
    if (mostFrequentCity.value && mostFrequentCity.count * 100 / personCount >= searchCriteria.city) {
        profile.city = mostFrequentCity.value;
        emptyProfile = false;
    }
    console.log(mostFrequentCity);

    const mostFrequentEducation = findMostFrequent(persons.map(person => person.education));
    if (mostFrequentEducation.value && mostFrequentEducation.count * 100 / personCount >= searchCriteria.education) {
        profile.education = mostFrequentEducation.value;
        emptyProfile = false;
    }
    console.log(mostFrequentEducation);

    const mostFrequentCompany = findMostFrequent(persons.map(person => person.company));
    if (mostFrequentCompany.value && mostFrequentCompany.count * 100 / personCount >= searchCriteria.company) {
        profile.company = mostFrequentCompany.value;
        emptyProfile = false;
    }
    console.log(mostFrequentCompany);

    console.log(profile);
    res.json(emptyProfile ? [] : [profile]);
}

function findMostFrequent(values: Array<string>) {
    if(values.length == 0)
        return null;
    var modeMap = {};
    var maxEl = values[0], maxCount = 1;
    for(var i = 0; i < values.length; i++)
    {
        var el = values[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return { value: maxEl, count: maxCount };
}

function buildQuery(searchCriteria){

    
    const searchCriteriaArray: Array<any> = [];
    Object.setPrototypeOf(searchCriteria, null);
    
    if (searchCriteria.city) {
        const city = eval('/'+searchCriteria.city+'/i');
        searchCriteriaArray.push({city: city})
    }

    if (searchCriteria.education) {
        const education = eval('/'+searchCriteria.education+'/i');
        searchCriteriaArray.push({education: education})
    }

    if (searchCriteria.company) {
        const company = eval('/'+searchCriteria.company+'/i');
        searchCriteriaArray.push({company: company});
    }

    // if (searchCriteria.experience_years_from && Number(searchCriteria.experience_years_from) > 0 ) {
    //     searchCriteriaArray.push({experience_years: {$gte :Number(searchCriteria.experience_years_from)}})
    // }
    // if (searchCriteria.experience_years_to && Number(searchCriteria.experience_years_to) > 0 && Number(searchCriteria.experience_years_to) < 100) {
    //     searchCriteriaArray.push({experience_years: {$lte:Number(searchCriteria.experience_years_to)}})
    // }
    if (searchCriteriaArray) {

        return {$or: searchCriteriaArray };
    }

    return {};
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