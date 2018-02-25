const child_process = require("child_process");

async function dev(){
  await spawn("node_modules\\.bin\\tsc", ["-p", "tsconfig.json"], {
    validateExitCode: true,
  });

  spawn("nodemon", ["dist/out-tsc/main.js"]);

  //spawn("ng", ["serve", "--open", "--proxy-config", "proxy.conf.json"]);

  spawn("node_modules\\.bin\\tsc", ["-p", "tsconfig.json", "-w"]);
}

function spawn(app, args, options) {
  return new Promise((resolve, reject)=>{
    const o = {
      shell: true,
      stdio: "inherit",
    };

    if(options) {
      Object.assign(o, options);
    }

    const p = child_process.spawn(app, args, o);

    if(o.validateExitCode) {
      p.on("close", function (exitCode) {
        if(exitCode != 0){
          reject(app + " failed with exist code " + exitCode);
          return;
        }

        resolve();
      });
    }

    p.on("error", function(err){
      reject(err);
    });
  });
}

exports.dev = dev;