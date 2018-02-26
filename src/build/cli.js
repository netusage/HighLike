const command = process.argv[2];

if(!command){
  console.log("command is missing");
  return;
}

const main = require("./main");
const func = main[command];
if(!func){
  console.log("Command " + command + " was not found");
  return;
}

func();