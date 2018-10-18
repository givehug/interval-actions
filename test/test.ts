import assert from 'assert';
import {interval} from '../src/interval';

describe('Test interval', () => {
	it('should call callback functions with given interval', done => {
		const arr = Array.from(Array(5), (_, i) => i);
		const time = 200;
		let timeStamp = Date.now();

		const action = interval((i: number) => {
			const now = Date.now();

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

	it('should throw error on invalid input', () => {
		assert.throws(() => interval(null));
	});
});
