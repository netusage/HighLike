function promisify(fn){
    return function(){
      const args = Array.from(arguments);
      const me = this;
  
      return new Promise(function(resolve, reject){
        function callback(err, retVal){
          if(err){
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
  
  exports.promisify = promisify;