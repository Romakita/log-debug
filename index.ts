import WritableStream = NodeJS.WritableStream;

var util = require('util');
var colors = require('colors/safe');

class Logger{
    private logEnable = true;
    public Logger;
    private stderr:WritableStream;
    private stdout:WritableStream;

    /**
     *
     * @param stdout
     * @param stderr
     */
    constructor(stdout?:WritableStream, stderr?:WritableStream){
        this.stderr = stderr || process.stderr;
        this.stdout = stdout || process.stdout;
    }

    private _argsToString(name, data, args:any[]):string{

        var message = name;

        switch(typeof data){
            case "string":

                if(args.length){
                    message += ' ' + util.format.apply([data].concat(args));
                }else{
                    message += ' ' + data;
                }

                break;

            default:

                args.unshift(data);

                for(var i = 0; i < args.length; i++) {

                    if(typeof args[i] == "object"){
                        if(args[i] instanceof Error){
                            message += ' ' + args[i].toString() + ' ' + args[i].stack;
                        }else{
                            message += ' ' + util.format('%j', args[i]);
                        }
                    }else {
                        message += ' ' + args[i];
                    }
                }

                break;
        }

        return message + "\n";
    }
    /**
     * Prints to stdout with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf() (the arguments are all passed to util.format()).
     * @param args
     * @returns {any}
     */
    public debug(data, ...args){

        if(!this.logEnable) return;

        this.stdout.write(this._argsToString(colors.blue('[DEBUG]'), data, args));

        return this;
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public info(data, ...args){

        if(!this.logEnable) return;

        this.stdout.write(this._argsToString(colors.blue('[INFO]'), data, args));

        return this;
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public warn(data, ...args){

        if(!this.logEnable) return;

        this.stderr.write(this._argsToString(colors.yellow('[WARN]'), data, args));

        return this;
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public error(data, ...args){

        if(!this.logEnable) return;

        this.stderr.write(this._argsToString(colors.yellow('[ERROR]'), data, args));

        return this;
    }

    /*public trace(data, ...args){
        if(!this.logEnable) return;

        this.stderr.write(this._argsToString(colors.yellow('[ERROR]'), data, args));

        return this;
    }*/
    /**
     *
     */
    start(){
        this.logEnable = true;
    }

    /**
     *
     */
    stop(){
        this.logEnable = false;
    }
}

var $log = new Logger();
export = $log;
$log.Logger = Logger;