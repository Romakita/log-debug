var util = require('util');
var colors = require('colors/safe');
var Logger = (function () {
    /**
     *
     * @param stdout
     * @param stderr
     */
    function Logger(stdout, stderr) {
        this.logEnable = true;
        this.stderr = stderr || process.stderr;
        this.stdout = stdout || process.stdout;
    }
    Logger.prototype._argsToString = function (name, data, args) {
        var message = name;
        switch (typeof data) {
            case "string":
                if (args.length) {
                    message += ' ' + util.format.apply([data].concat(args));
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
                            message += ' ' + args[i].toString() + ' ' + args[i].stack;
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
            return;
        this.stdout.write(this._argsToString(colors.blue('[DEBUG]'), data, args));
        return this;
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
            return;
        this.stdout.write(this._argsToString(colors.blue('[INFO]'), data, args));
        return this;
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
            return;
        this.stderr.write(this._argsToString(colors.yellow('[WARN]'), data, args));
        return this;
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
            return;
        this.stderr.write(this._argsToString(colors.yellow('[ERROR]'), data, args));
        return this;
    };
    /*public trace(data, ...args){
        if(!this.logEnable) return;

        this.stderr.write(this._argsToString(colors.yellow('[ERROR]'), data, args));

        return this;
    }*/
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
    return Logger;
})();
var $log = new Logger();
$log.Logger = Logger;
module.exports = $log;
//# sourceMappingURL=index.js.map