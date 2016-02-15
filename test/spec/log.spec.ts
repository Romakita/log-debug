import * as Logger from '../../index';
import * as Chai from 'chai';
import * as Stream from "stream";
import {Writable} from "stream";

var expect = Chai.expect;
var util = require('util');

class IOStream extends Writable implements Writable{
    current = '';

    _write(chunk: any, encoding: string, callback: Function): void{
        this.current += chunk.toString('utf8');
    }

    read(){
        return this.current;
    }
}

describe('Logger', function(){

    var $log, ioStream;


    beforeEach(function(){
        try{
            ioStream = new IOStream();

            ioStream.on('error', function(error){
                console.error(error, error.stack);
            });

        }catch(er){
            console.error('Unable to instanciate stdout stream ', er);
        }
    });

    afterEach(function(){
        ioStream.end();
    });

    describe('debug()', function(){

        it('should print a debug log', function(){

            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.debug('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[DEBUG] ézeffà^\n');

        });

        it('should convert object to JSON', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.debug({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[DEBUG] {"test":"test"}\n');


        });

        it('should use util.format() to print messages', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.debug('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[DEBUG] util.format({"test":"test"}) => 4\n');

        });

    });

    describe('info()', function(){

        it('should print a info log', function(){

            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.info('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[INFO] ézeffà^\n');

        });

        it('should convert object to JSON', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.info({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[INFO] {"test":"test"}\n');


        });

        it('should use util.format() to print messages', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.info('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[INFO] util.format({"test":"test"}) => 4\n');

        });

    });


    describe('error()', function(){

        it('should print a error log', function(){

            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.error('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[ERROR] ézeffà^\n');

        });

        it('should convert object to JSON', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.error({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[ERROR] {"test":"test"}\n');


        });

        it('should use util.format() to print messages', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.error('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[ERROR] util.format({"test":"test"}) => 4\n');

        });


        it('should print error', function(){

            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.error(new EvalError('Test'));

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[ERROR] EvalError: Test');

        })

    });

    describe('info()', function(){

        it('should print a debug log', function(){

            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.info('ézeffà^');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[INFO] ézeffà^\n');

        });

        it('should convert object to JSON', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.info({test:'test'});

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[INFO] {"test":"test"}\n');


        });

        it('should use util.format() to print messages', function(){


            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.info('util.format(%j) => %s', {test:'test'}, '4');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[INFO] util.format({"test":"test"}) => 4\n');

        });

    });


    describe('withTrace()', function(){
        it('should print message with stackTrace', function(){

            $log = new Logger.Logger(ioStream, ioStream, true);
            //$log.debug('test');
            $log.withTrace();

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('at Context');

        });
    });

    describe('trace()', function() {

        it('should print a stacktrace with a custom message', function(){

            $log = new Logger.Logger(ioStream, ioStream, true);

            $log.trace('test');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.contain('[TRACE] test');
            expect(ioStream.read()).to.contain('at Context');

        });

    });

    describe('Example rendering', function(){

        it('show', function(){

            Logger
                .info('info().withTrace()').withTrace()
                .debug('debug().withLine()').withLine();

            Logger
                .warn('warn()')
                .error('error()')
                .trace('trace()');
        });
    })

});