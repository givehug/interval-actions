const assert = require('assert');
const {makeQueue, makeStack} = require('../index.js');

const arr = Array.from(Array(5), (_, i) => i);
const arrLen = arr.length;

describe('Test interval actions', function () {

	it('should create async actions queue and execute with 200ms interval', function(done) {
		const interval = 100;
		const queue = makeQueue(interval, {whenEmpty});
		const timeStamp = Date.now();

		function whenEmpty() {
			assert.equal(queue.length, 0, 'queue finish length');
			done();
		}

		arr.forEach(i => {
			queue.add(() => {
				const timeDif = Date.now() - timeStamp;
				const isTtimeDifCorrect = timeDif >= i*interval && timeDif <= (i+1)*interval;

				// console.log('queue', i, 'in', timeDif + 'ms');
				assert.ok(isTtimeDifCorrect, 'queue timeDif');
			});
		});

		assert.equal(queue.length, arrLen, 'queue start length');
	});

	it('should create async actions stack and execute with 200ms interval', function(done) {
		const interval = 100;
		const stack = makeStack(interval, {whenEmpty});
		const timeStamp = Date.now();

		function whenEmpty() {
			assert.equal(stack.length, 0, 'queue finish length');
			done();
		}

		arr.forEach(i => {
			stack.add(() => {
				const timeDif = Date.now() - timeStamp;
				const isTtimeDifCorrect = timeDif >= (arrLen-i-1)*interval && timeDif <= (arrLen-i)*interval;

				// console.log('stack', i, 'in', timeDif + 'ms');
				assert.ok(isTtimeDifCorrect, 'stack timeDif');
			});
		});

		assert.equal(stack.length, 5, 'stack start length');
	});

	it('should clear queue and stack before execution', function() {
		const queue = makeQueue();
		const stack = makeStack();

		arr.forEach(() => {
			queue.add(() => assert.ok(false, 'Should not be executed'));
			stack.add(() => assert.ok(false, 'Should not be executed'));
		});

		queue.clear();
		stack.clear();

		assert.equal(queue.length, 0, 'queue length');
		assert.equal(queue.length, 0, 'stack length');
	});

	it('should pause actions queue', function(done) {
		const queue = makeQueue(0, {whenEmpty});
		const stopAt = 2;

		function whenEmpty() {
			assert.equal(queue.length, 0, 'queue final length');
			done();
		}

		arr.forEach(i => {
			queue.add(() => {
				i === stopAt && queue.pause();

				if (i <= stopAt) {
					assert.ok(true, 'Should be executed');
				} else {
					assert.ok(false, 'Should not be executed');
				}
			});
		});

		assert.equal(queue.length, arrLen, 'queue initial length');

		setTimeout(() => {
			assert.equal(queue.isPaused, true, 'queue is paused');
			assert.equal(queue.length, arrLen - stopAt - 1, 'queue has correct length');
			queue.clear();
			assert.equal(queue.length, 0, 'queue length after clear');
			queue.execute();
		}, 100);
	});

	it('should pause actions stack', function(done) {
		const stack = makeStack(0, {whenEmpty});
		const stopAt = 2;

		function whenEmpty() {
			assert.equal(stack.length, 0, 'stack final length');
			done();
		}

		arr.forEach(i => {
			stack.add(() => {
				i === stopAt && stack.pause();
				assert.ok(true, 'Should be executed');
			});
		});

		assert.equal(stack.length, arrLen, 'stack initial length');

		setTimeout(() => {
			assert.equal(stack.isPaused, true, 'stack is paused');
			assert.equal(stack.length, arrLen - stopAt - 1, 'stack has correct length');
			stack.execute();
		}, 100);
	});

	it('should delay first queue action', function(done) {
		const interval = 100;
		const queue = makeQueue(interval, {delayFirstAction: true});
		const timeStamp = Date.now();

		queue.add(() => {
			assert.ok(Date.now() - timeStamp >= interval, 'Should be executed');
			done();
		});
	});

	it('should not execute on add', function(done) {
		const queue = makeQueue(0, {executeOnAdd: false, whenEmpty});

		function whenEmpty() {
			assert.equal(queue.length, 0, 'queue final length');
			done();
		}

		queue.add(() => {});

		assert.equal(queue.length, 1, 'queue initial length');

		setTimeout(() => {
			assert.equal(queue.isPaused, false, 'queue is paused');
			assert.equal(queue.length, 1, 'queue has correct length');
			queue.execute();
		}, 100);
	});

});
