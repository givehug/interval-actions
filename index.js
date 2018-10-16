const IntervalActions = require('./src/index');

module.exports = {
	makeQueue: (...args) => new IntervalActions('queue', ...args),
	makeStack: (...args) => new IntervalActions('stack', ...args),
};
