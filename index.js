var log = true;
var colors = require('colors/safe');
var debug=function(){
    if(!log) return;
    arguments.unshift(colors.blue('[INFO]'));
    return console.log.apply(console, arguments);
};

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
    debug:debug,
    info:debug,
    /**
     *
     * @returns {*}
     */
    warn:function(){
        if(!log) return;
        arguments.unshift(colors.yellow('[WARN]'));
        return console.warn.apply(console, arguments);
    },
    /**
     *
     * @returns {*}
     */
    error:function(){
        if(!log) return;
        var o = [colors.red('[ERROR]')];

        for(var key in arguments){
            o.push(arguments[key]);
            if(arguments[key] instanceof Error){
                o.push(arguments[key].stack)
            }
        }

        return console.error.apply(console, o);
    }
};
