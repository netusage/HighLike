const { spawn } = require("child_process");
const command = process.argv[2];

if(command == "start"){
    start();
}

function start() {
    spawn("node_modules\\.bin\\tsc", [
        "-p",
        "tsconfig.json",
        "-w"
    ], {
        shell: true,
        stdio: "inherit",
    });
    spawn("node", ["dist\\out-tsc\\main.js"], {
        shell: true,
        stdio: "inherit",
    });
}