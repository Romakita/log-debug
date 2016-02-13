# log-debug [![Build Status](https://travis-ci.org/Romakita/httpexceptions.svg?branch=master)](https://travis-ci.org/Romakita/httpexceptions)

> Provide logger like angular.js and/or Log4j (Java) with colorization.

## Features

 * `$log.debug(...args)` : print "[INFO] Message".
 * `$log.info(...args)` : print "[INFO] Message".
 * `$log.warn(...args)` : print "[WARN] Message".
 * `$log.error(...args)` : print "[ERROR] Message". 
 * `$log.error(new Error('my error'))` : print "[ERROR] ERROR stack trace".
 * `$log.start()` : Enable log.
 * `$log.stop()` : Disable log.

## Installation
```bash
$ npm install -g typescript typings 
$ npm install log-debug
```
## API


``` javascript
   var $log = require('log-debug');

   $log.debug('test') // => [INFO] test
   $log.debug({test:test}) // => [INFO] {test:test}
   
   $log.warn('test') // => [WARN] test
   $log.warn({test:test}) // => [WARN] {test:test}
   
   $log.error('test') // => [ERROR] test
   $log.error({test:test}) // => [ERROR] {test:test}
   
```


## Test

```bash 
$ npm install -g mocha
$ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[travis]: https://travis-ci.org/