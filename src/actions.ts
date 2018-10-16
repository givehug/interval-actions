/**
 * Create actions queue or stack (eg async actions).
 * Execute each function with given interval.
 */
import Stack from './stack';
import Queue from './queue';

export type OpsType = {
	executeOnAdd?: boolean,
	delayFirstAction?: boolean,
	whenEmpty?: Function,
};

type PropsType = {
	mode: string,
	interval: number,
	ops: OpsType,
	waiting: boolean,
	paused: boolean,
	timer: any,
	collection: Stack | Queue,
};

const defaultOps: OpsType = {
	executeOnAdd: true,
	delayFirstAction: false,
	whenEmpty: null
};

class IntervalActions {
	private props: PropsType;
	private addToCollection: Function;
	private removeFromCollection: Function;

	constructor(mode: string, interval = 0, ops: OpsType) {
		this.props = {
			mode,
			interval,
			ops: Object.assign({}, defaultOps, ops),
			waiting: false,
			paused: false,
			timer: null,
			collection: mode === 'stack' ? new Stack() : new Queue,
		};
		this.addToCollection = this.props.collection instanceof Stack
			? this.props.collection.push
			: this.props.collection.enqueue;
		this.removeFromCollection = this.props.collection instanceof Stack
			? this.props.collection.pop
			: this.props.collection.dequeue;
	}

	get isPaused() {
		return this.props.paused;
	}

	get length() {
		return this.props.collection.size;
	}

	get size() {
		return this.length;
	}

	private invoke(interval: number) {
		if (this.props.waiting || this.isPaused) {
			return;
		}
		if (this.size) {
			this.props.waiting = true;
			this.props.timer = setTimeout(() => {
				this.removeFromCollection()();
				this.props.waiting = false;
				this.invoke(this.props.interval);
			}, interval);
		} else {
			this.props.ops.whenEmpty && this.props.ops.whenEmpty();
			this.clearTimer();
		}
	}

	private clearTimer() {
		this.props.waiting = false;
		this.props.timer && clearTimeout(this.props.timer);
	}

	add(func: Function) {
		this.addToCollection(func);
		this.props.ops.executeOnAdd && this.invoke(
			this.props.ops.delayFirstAction ? this.props.interval : 0
		);
	}

	execute() {
		this.props.paused = false;
		this.invoke(0);
	}

	pause() {
		this.props.paused = true;
		this.clearTimer();
	}

	clear() {
		this.props.collection = this.props.mode === 'stack' ? new Stack() : new Queue;
		this.clearTimer();
	}
}

export default IntervalActions;
