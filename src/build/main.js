const path = require("path");
const fs = require("fs");
const child_process = require("child_process");
const {promisify} = require("./helpers");
const mongodb = require("mongodb");

const readFile = promisify(fs.readFile);
const connect = promisify(mongodb.MongoClient.connect);
mongodb.Collection.prototype.insertManyAsync = promisify(mongodb.Collection.prototype.insertMany);
mongodb.Cursor.prototype.toArrayAsync = promisify(mongodb.Cursor.prototype.toArray);

async function dev(){
  try {
    await runMongo();

    await fillMongoWithCandidates();

    await fillMongoWithEmployees();

    await spawn("src\\server\\node_modules\\.bin\\tsc", ["-p", "src\\server\\tsconfig.json"], {
      validateExitCode: true,
    });

    spawn("nodemon", ["dist-srv/main.js"]);

    spawn("ng", ["serve", "--open", "--proxy-config", "proxy.conf.json"]);

    spawn("src\\server\\node_modules\\.bin\\tsc", ["-p", "src\\server\\tsconfig.json", "-w"]);
  } catch(err) {
    console.error(err);
  }
}

async function runMongo(){
  const mongoPath = process.env.MONGO_PATH;
  if (!mongoPath) {
    throw new Error("***************************** MONGO_PATH IS EMPTY *****************************")
  }

  const dir = path.join(__dirname, '../../db/data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const mongoExe = path.resolve(mongoPath, "bin/mongod");
  const mongoData = path.resolve(__dirname, "../../db/data");

  await spawn(mongoExe, ["--dbpath", mongoData]);
}

async function fillMongoWithCandidates() {
  const initialJsonFilePath = path.resolve(__dirname, "../../db/initial.json");
  const initialContacts = JSON.parse(await readFile(initialJsonFilePath, "utf8"));

  console.log("Connecting to mongo");
  const client = await connect("mongodb://localhost:27017");

  const db = client.db("Highlike");
  const coll = db.collection("people");

  console.log("Checking data is present inside db");
  const contacts = await coll.find({}).toArrayAsync();
  if (contacts.length == 0) {
    console.log("Filling initial data from " + initialJsonFilePath);
    await coll.insertManyAsync(initialContacts);
  }
  else {
    console.log("Data is already present inside database")
  }

  client.close();
}

async function fillMongoWithEmployees() {
  const initialJsonFilePath = path.resolve(__dirname, "../../db/initialEmployees.json");
  const initialContacts = JSON.parse(await readFile(initialJsonFilePath, "utf8"));

  console.log("Connecting to mongo");
  const client = await connect("mongodb://localhost:27017");

  const db = client.db("Highlike");
  const coll = db.collection("employees");

  console.log("Checking data is present inside db");
  const contacts = await coll.find({}).toArrayAsync();
  if (contacts.length == 0) {
    console.log("Filling initial data from " + initialJsonFilePath);
    await coll.insertManyAsync(initialContacts);
  }
  else {
    console.log("Data is already present inside database")
  }

  client.close();
}

function spawn(app, args, options) {
  return new Promise((resolve, reject) => {
    const o = {
      shell: true,
      stdio: "inherit",
    };

    if (options) {
      Object.assign(o, options);
    }

    const p = child_process.spawn(app, args, o);

    if (o.validateExitCode) {
      p.on("close", function (exitCode) {
        if (exitCode != 0) {
          reject(app + " failed with exist code " + exitCode);
          return;
        }

        resolve();
      });
    }
    else {
      resolve();
    }

    p.on("error", function (err) {
      reject(err);
    });
  });
}


exports.dev = dev;