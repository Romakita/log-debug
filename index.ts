require('source-map-support').install();

import WritableStream = NodeJS.WritableStream;

var util = require('util');
var colors = require('colors/safe');

const LOG_COLORS = {
    INFO:   'blue',
    DEBUG:  'cyan',
    'WARN ':'yellow',
    TRACE:  'magenta',
    ERROR:  'red'
};

class Logger{

    public Logger; //Logger Class reference

    private logEnable = true;
    private noColors = false;
    private stderr:WritableStream;
    private stdout:WritableStream;
    private previousStd:WritableStream;

    /**
     *
     * @param stdout
     * @param stderr
     */
    constructor(stdout?:WritableStream, stderr?:WritableStream, noColors?:boolean){

        this.stderr = stderr || process.stderr;
        this.stdout = stdout || process.stdout;

        this.previousStd = this.stdout;

        if(noColors != undefined){
            this.setNoColors(noColors);
        }
    }

    /**
     * Prints to stdout with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf() (the arguments are all passed to util.format()).
     * @param args
     * @returns {any}
     */
    public debug(data, ...args):Logger{
        if(!this.logEnable) return this;

        return this.write(this.stdout, 'DEBUG', data, args);
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public info(data, ...args):Logger{
        if(!this.logEnable) return this;

        return this.write(this.stdout, 'INFO', data, args);
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public warn(data, ...args):Logger{
        if(!this.logEnable) return this;

        return this.write(this.stderr, 'WARN ', data, args);
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public error(data, ...args):Logger{
        if(!this.logEnable) return this;

        return this.write(this.stderr, "ERROR", data, args);
    }

    /**
     *
     * @param data
     * @param args
     * @returns {any}
     */
    public trace(data, ...args):Logger{
        if(!this.logEnable) return this;

        var stack = '\n' + this.colorize(Logger.createStack(), LOG_COLORS.TRACE) + "\n";

        args.push(stack); //push StackTrace

        return this.write(this.stderr, "TRACE", data, args);
    }

    /**
     *
     * @returns {Logger}
     */
    public withTrace():Logger{
        if(!this.logEnable) return this;

        this.previousStd.write(this.colorize(Logger.createStack(), "gray") + '\n\n');

        return this;
    }

    /**
     *
     * @returns {Logger}
     */
    public withLine():Logger{
        if(!this.logEnable) return this;

        var stackTrace = Logger.createStack();
        var line = '\tat (' + stackTrace.split('\n')[0].split('(')[1];

        this.previousStd.write(this.colorize(line, "gray") + '\n\n');

        return this;
    }
    /**
     *
     */
    public start(){
        this.logEnable = true;
    }

    /**
     *
     */
    public stop(){
        this.logEnable = false;
    }

    /**
     *
     * @param value
     * @returns {Logger}
     */
    public setNoColors (value:boolean):Logger {
        this.noColors = value;
        return this;
    }

    /**
     *
     * @param std
     * @returns {Logger}
     */
    public setStdout(std:WritableStream):Logger{
        this.stdout = std;
        return this;
    }

    /**
     *
     * @param std
     * @returns {Logger}
     */
    public setStderr(std:WritableStream):Logger{
        this.stderr = std;
        return this;
    }

    /**
     *
     * @param std
     * @param name
     * @param data
     * @param args
     * @returns {Logger}
     */
    private write(std:WritableStream, name:string, data:any, args:any[]):Logger{
        this.previousStd = std;

        name = this.colorize('['+ name +']', LOG_COLORS[name]);

        var message = Logger.createMessage(data, args);

        this.previousStd.write(name + message);

        return this;
    }

    /**
     *
     * @param name
     * @param data
     * @param args
     * @returns {string}
     */
    private static createMessage(data:any, args:any[]):string{

        var message = '';

        switch(typeof data){
            case "string":

                if(args.length && util.inspect(data)){
                    message += ' ' + util.format.apply(util, [data].concat(args));
                }else{
                    message += ' ' + data;
                }

                break;

            default:

                args.unshift(data);

                for(var i = 0; i < args.length; i++) {

                    if(typeof args[i] == "object"){
                        if(args[i] instanceof Error){
                            message += ' ' + args[i].toString() + ' ' + args[i].stack.replace(args[i].toString(), '');
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
     * Create stack trace  the lines of least Logger.
     * @returns {string}
     */
    public static createStack():string{
        var stack:string = new Error().stack.replace('Error\n','');
        var array:string[] = stack.split('\n');

        if(array[0].indexOf("Logger.") > -1){ //remove current function
            array.splice(0, 1);
        }

        if(array[0].indexOf("Logger.") > -1){ //remove caller
            array.splice(0, 1);
        }

        return array.join('\n');
    }

    /**
     *
     * @param title
     * @param color
     * @returns {any}
     */
    private colorize(title, color){
        return this.noColors ? title : colors[color](title);
    }
}

var $log = new Logger();
export = $log;
$log.Logger = Logger;