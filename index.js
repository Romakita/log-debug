require('source-map-support').install();
var util = require('util');
var colors = require('colors/safe');
var LOG_COLORS = {
    INFO: 'blue',
    DEBUG: 'cyan',
    'WARN ': 'yellow',
    TRACE: 'magenta',
    ERROR: 'red'
};
var Logger = (function () {
    /**
     *
     * @param stdout
     * @param stderr
     */
    function Logger(stdout, stderr, noColors) {
        this.logEnable = true;
        this.noColors = false;
        this.stderr = stderr || process.stderr;
        this.stdout = stdout || process.stdout;
        this.previousStd = this.stdout;
        if (noColors != undefined) {
            this.setNoColors(noColors);
        }
    }
    /**
     * Prints to stdout with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf() (the arguments are all passed to util.format()).
     * @param args
     * @returns {any}
     */
    Logger.prototype.debug = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.logEnable)
            return this;
        return this.write(this.stdout, 'DEBUG', data, args);
    };
    /**
     *
     * @param args
     * @returns {any}
     */
    Logger.prototype.info = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.logEnable)
            return this;
        return this.write(this.stdout, 'INFO', data, args);
    };
    /**
     *
     * @param args
     * @returns {any}
     */
    Logger.prototype.warn = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.logEnable)
            return this;
        return this.write(this.stderr, 'WARN ', data, args);
    };
    /**
     *
     * @param args
     * @returns {any}
     */
    Logger.prototype.error = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.logEnable)
            return this;
        return this.write(this.stderr, "ERROR", data, args);
    };
    /**
     *
     * @param data
     * @param args
     * @returns {any}
     */
    Logger.prototype.trace = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.logEnable)
            return this;
        var stack = '\n' + this.colorize(Logger.createStack(), LOG_COLORS.TRACE) + "\n";
        args.push(stack); //push StackTrace
        return this.write(this.stderr, "TRACE", data, args);
    };
    /**
     *
     * @returns {Logger}
     */
    Logger.prototype.withTrace = function () {
        if (!this.logEnable)
            return this;
        this.previousStd.write(this.colorize(Logger.createStack(), "gray") + '\n\n');
        return this;
    };
    /**
     *
     * @returns {Logger}
     */
    Logger.prototype.withLine = function () {
        if (!this.logEnable)
            return this;
        var stackTrace = Logger.createStack();
        var line = '\tat (' + stackTrace.split('\n')[0].split('(')[1];
        this.previousStd.write(this.colorize(line, "gray") + '\n\n');
        return this;
    };
    /**
     *
     */
    Logger.prototype.start = function () {
        this.logEnable = true;
    };
    /**
     *
     */
    Logger.prototype.stop = function () {
        this.logEnable = false;
    };
    /**
     *
     * @param value
     * @returns {Logger}
     */
    Logger.prototype.setNoColors = function (value) {
        this.noColors = value;
        return this;
    };
    /**
     *
     * @param std
     * @returns {Logger}
     */
    Logger.prototype.setStdout = function (std) {
        this.stdout = std;
        return this;
    };
    /**
     *
     * @param std
     * @returns {Logger}
     */
    Logger.prototype.setStderr = function (std) {
        this.stderr = std;
        return this;
    };
    /**
     *
     * @param std
     * @param name
     * @param data
     * @param args
     * @returns {Logger}
     */
    Logger.prototype.write = function (std, name, data, args) {
        this.previousStd = std;
        name = this.colorize('[' + name + ']', LOG_COLORS[name]);
        var message = Logger.createMessage(data, args);
        this.previousStd.write(name + message);
        return this;
    };
    /**
     *
     * @param name
     * @param data
     * @param args
     * @returns {string}
     */
    Logger.createMessage = function (data, args) {
        var message = '';
        switch (typeof data) {
            case "string":
                if (args.length && util.inspect(data)) {
                    message += ' ' + util.format.apply(util, [data].concat(args));
                }
                else {
                    message += ' ' + data;
                }
                break;
            default:
                args.unshift(data);
                for (var i = 0; i < args.length; i++) {
                    if (typeof args[i] == "object") {
                        if (args[i] instanceof Error) {
                            message += ' ' + args[i].toString() + ' ' + args[i].stack.replace(args[i].toString(), '');
                        }
                        else {
                            message += ' ' + util.format('%j', args[i]);
                        }
                    }
                    else {
                        message += ' ' + args[i];
                    }
                }
                break;
        }
        return message + "\n";
    };
    /**
     * Create stack trace  the lines of least Logger.
     * @returns {string}
     */
    Logger.createStack = function () {
        var stack = new Error().stack.replace('Error\n', '');
        var array = stack.split('\n');
        if (array[0].indexOf("Logger.") > -1) {
            array.splice(0, 1);
        }
        if (array[0].indexOf("Logger.") > -1) {
            array.splice(0, 1);
        }
        return array.join('\n');
    };
    /**
     *
     * @param title
     * @param color
     * @returns {any}
     */
    Logger.prototype.colorize = function (title, color) {
        return this.noColors ? title : colors[color](title);
    };
    return Logger;
})();
var $log = new Logger();
$log.Logger = Logger;
module.exports = $log;
//# sourceMappingURL=index.js.map