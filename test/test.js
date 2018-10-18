const assert = require('assert');
const {interval} = require('../index.js');

const arr = Array.from(Array(5), (_, i) => i);

describe('Test interval', function () {
	it('should call callback functions with given interval', function(done) {
		const time = 100;
		let timeStamp = Date.now();

		const action = interval(i => {
			const now = Date.now();
			const timeDif = now - timeStamp;

			if (i === 0) {
				assert.ok(now - timeStamp < time, `correct time dif ${i}`);
			} else {
				assert.ok(now - timeStamp > time, `correct time dif ${i}`);
			}

			if (i === arr.length - 1) {
				done();
			}

			timeStamp = now;
		}, time);

		arr.forEach(action);
	});
});
