/**
 * Create actions queue or stack (eg async actions).
 * Execute each function with given interval.
 */
const Stack = require('./stack');
const Queue = require('./queue');

const defaultOps = {
	executeOnAdd: true,
	delayFirstAction: false,
	whenEmpty: null
};

class IntervalActions {
	constructor(mode, interval = 0, ops) {
		this._props = {
			mode,
			interval,
			ops: Object.assign({}, defaultOps, ops),
			waiting: false,
			paused: false,
			timer: null,
		};
		this._resetCollection();
		this._addMethod = this._isStack ? 'push' : 'enqueue';
		this._removeMethod = this._isStack ? 'pop' : 'dequeue';
	}

	get _isStack() {
		return this._props.mode === 'stack';
	}

	get isPaused() {
		return this._props.paused;
	}

	get length() {
		return this._props.collection.size;
	}

	get size() {
		return this.length;
	}

	_resetCollection() {
		this._props.collection = this._isStack ? new Stack() : new Queue;
	}

	_execute(interval) {
		if (this._props.waiting || this.isPaused) {
			return;
		}
		if (this.size) {
			this._props.waiting = true;
			this._props.timer = setTimeout(() => {
				this._props.collection[this._removeMethod]()();
				this._props.waiting = false;
				this._execute(this._props.interval);
			}, interval);
		} else {
			this._props.ops.whenEmpty && this._props.ops.whenEmpty();
			this._clearTimer();
		}
	}

	_clearTimer() {
		this._props.waiting = false;
		this._props.timer && clearTimeout(this._props.timer);
	}

	add(func) {
		this._props.collection[this._addMethod](func);
		this._props.ops.executeOnAdd && this._execute(
			this._props.ops.delayFirstAction ? this._props.interval : 0
		);
	}

	execute() {
		this._props.paused = false;
		this._execute();
	}

	pause() {
		this._props.paused = true;
		this._clearTimer();
	}

	clear() {
		this._resetCollection();
		this._clearTimer();
	}
}

module.exports = IntervalActions;
