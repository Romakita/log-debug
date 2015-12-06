var log = true;
var colors = require('colors/safe');

GLOBAL.$log = module.exports = {
    /**
     * Start logguer
     */
    start:function(){
        log = true;
    },
    /**
     * Stop logguer
     */
    stop:function(){
        log = false;
    },
    /**
     * Print a trace in the console.
     * @returns {*}
     */
    debug:function(){
        if(log){
            var o = [colors.blue('[INFO]')];

            for(var key in arguments){
                o.push(arguments[key]);
            }

            return console.log.apply(console, o);
        }
    },
    /**
     *
     * @returns {*}
     */
    warn:function(){
        if(log){
            var o = [colors.yellow('[WARN]')];

            for(var key in arguments){
                o.push(arguments[key]);
            }

            return console.warn.apply(console, o);
        }
    },
    /**
     *
     * @returns {*}
     */
    error:function(){
        if(log){
            var o = [colors.red('[ERROR]')];

            for(var key in arguments){
                o.push(arguments[key]);
                if(arguments[key] instanceof Error){
                    o.push(arguments[key].stack)
                }
            }

            return console.error.apply(console, o);
        }
    }
};