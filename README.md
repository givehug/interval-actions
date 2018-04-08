
# interval-actions

##### Create actions queue/stack. Added actions are executed with minimum interval in between.

This may be useful when dealing with frequent async events, and you want be sure they are processed with certain interval.


## Install

```bash
$ npm install --save interval-actions
```


## Usage

Immediate execution:

```bash
import intervalActions from 'interval-actions';

const queue = intervalActions.makeQueue(500);
const timeStamp = Date.now();

[0, 1, 2].forEach(i => {
	queue.add(() => {
		console.log(i + ' executed in ' + (Date.now() - timeStamp) + 'ms');
	});
});

// Result:
// '0 executed in 1ms'
// '1 executed in 509ms'
// '2 executed in 1012ms'
```

Delayed execution:

```bash
import intervalActions from 'interval-actions';
 
const stack = intervalActions.makeStack(500, {
	executeOnAdd: false,
	whenEmpty: () => console.log('Stack is empty, size: ' + stack.length),
});

const timeStamp = Date.now();

[0, 1, 2].forEach(i => {
	stack.add(() => {
		console.log(i + ' executed in ' + (Date.now() - timeStamp) + 'ms');
	});
});

stack.execute();

// Result:
// '2 executed in 2ms'
// '1 executed in 508ms'
// '0 executed in 1013ms'
// 'Stack is empty, size: 0'
```

es5 version:

```bash
var intervalActions = require('interval-actions/es5)';
```


## Api

#### `intervalActions.makeQueue(interval, options)`

#### `intervalActions.makeStack(interval, options)`

| param      | type    | description                                             |
|------------|---------|---------------------------------------------------------|
| `interval` | number  | Minimum interval between functions execution. Optional. |
| `options`  | Object  | Default options overrides. Optional.                    |

| option             | type      | default | description                                                                                      |
|--------------------|-----------|---------|--------------------------------------------------------------------------------------------------|
| `executeOnAdd`     | boolean   | true    | when new actions are added, they are executed immediately                                        |
| `delayFirstAction` | boolean   | false   | first action is executed without delay                                                           |
| `whenEmpty`        | ?Function | null    | callback function, executed when queue or stack becomes empty (is not triggered by clear() call) |


## Instance properties

| property   | type    |
|------------|---------|
| `isPaused` | boolean |
| `length`   | number  |


## Instance methods

| method    | description                                                  |
|-----------|--------------------------------------------------------------|
| `add`     | add new action to queue or stack                             |
| `pause`   | pause execution                                              |
| `execute` | execute actions / also resumes execution after it was paused |
| `clear`   | clear queue or stack                                         |
