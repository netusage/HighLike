import * as express from "express";

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

const bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data

app.post('/api/person/getMatches',function(req,res){
    const candidate = req.body.candidateParams;
    const data = {
        "Data":"test" + candidate  
    };

    res.json(data);
});

function runApi(fn){
    return function(req, res) {
        try {
            const retVal = fn();

            if (retVal && retVal.then) {
                retVal.then(data => {
                    res.json(data);
                }).catch(err => {
                    res.json({error: err.message});
                    res.end();
                });
            }
        }
        catch (err) {
            res.json({error: err.message});
        }
    }
}

app.listen(3000, function() {
    console.log("Server is running...");
});