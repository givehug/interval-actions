/**
 * Create actions queue or stack (eg async actions).
 * Execute each function with given interval.
 */

class IntervalActions {

	constructor(mode, interval = 0, ops) {
		const defaultOps = {
			executeOnAdd: true,
			delayFirstAction: false,
			whenEmpty: null
		};

		this._props = {
			mode,
			interval,
			ops: Object.assign(defaultOps, ops),
			list: [],
			waiting: false,
			paused: false,
			timer: null,
		};
	}

	get isPaused() {
		return this._props.paused;
	}

	get length() {
		return this._props.list.length;
	}

	_execute(interval) {
		if (this._props.waiting || this.isPaused) {
			return;
		}

		if (this.length) {
			this._props.waiting = true;

			this._props.timer = setTimeout(() => {
				this._props.list[this._props.mode === 'stack' ? this.length - 1 : 0]();
				this._props.list[this._props.mode === 'stack' ? 'pop' : 'shift']();
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
		this._props.list.push(func);
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
		this._props.list = [];
		this._clearTimer();
	}
}

module.exports = {
	makeQueue: (...args) => new IntervalActions('queue', ...args),
	makeStack: (...args) => new IntervalActions('stack', ...args),
};
