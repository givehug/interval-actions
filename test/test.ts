import assert from 'assert';
import { interval } from '../src/interval';

describe('Test interval', () => {
  it('should call callback functions with given interval', (done) => {
    const arr = Array.from(Array(5), (_, i) => i);
    const timeout = 200;
    let timeStamp = Date.now();
    let prevTimestamp = 0;

    const action = interval((i: number) => {
      const now = Date.now();
      const timeDiff = now - timeStamp;

      assert.ok(prevTimestamp < now);

      prevTimestamp = now;

      if (i === 0) {
        assert.ok(timeDiff < timeout, `correct time dif ${i} - ${timeDiff}`);
      } else {
        assert.ok(timeDiff >= timeout, `correct time dif ${i} - ${timeDiff}`);
      }

      if (i === arr.length - 1) {
        done();
      }

      timeStamp = now;
    }, timeout);

    arr.forEach(action);
  });
});
