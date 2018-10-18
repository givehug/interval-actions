
# interval

Similar to debounce/throttle, but callbacks will be added to queue and called with provided interval. First callback call is invoked immediately. Note, last callback call wont cause timeout and prevent process from exiting immediately.

## Install

```bash
$ npm i --save interval-actions
```

## Usage

```bash
const {interval} = require('./dist/interval');

const logWithInterval = interval(console.timeLog, 1000);

console.time('time');

logWithInterval('time'); // time: 0.405ms
logWithInterval('time'); // time: 1005.094ms
logWithInterval('time'); // time: 2006.982ms

process.on('exit', () => {
	console.timeEnd('time'); // time: 2007.645ms
});
```

## Api

| param      | type    | description                                             |
|------------|---------|---------------------------------------------------------|
| `fn` | Function  | callback function |
| `time`  | number  | interval duration in ms |
