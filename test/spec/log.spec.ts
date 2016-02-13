import * as Logger from '../../index';
import * as Chai from 'chai';
import * as Stream from "stream";
import {Writable} from "stream";

var expect = Chai.expect;
var util = require('util');

class IOStream extends Writable implements Writable{
    current;

    _write(chunk: any, encoding: string, callback: Function): void{
        this.current = chunk;
    }

    read(){
        return this.current.toString();
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

        it('should print [DEBUG] Test', function(){

            try{
                $log = new Logger.Logger(ioStream, ioStream);
            }catch(er){
                console.error('Unable to instanciate Logger');
            }

            $log.debug('Test');

            expect(ioStream.read()).to.be.a('string');
            expect(ioStream.read()).to.equal('[DEBUG] Test\n');

        });

    });


});