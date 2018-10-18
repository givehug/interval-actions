import Queue from './queue';

export const interval = (fn: Function, time: number = 0) => {
	const queue = new Queue<Function>();
	let timestamp: number = 0;
	let waiting: boolean = false;

	const checkAndWait = () => {
		if (!queue.size) return;
		if (waiting) return;

		const now = Date.now();
		const timeLeft = timestamp ? (timestamp + time - now) : 0;

		if (timeLeft <= 0) {
			queue.dequeue()();
			timestamp = now;
			checkAndWait();
		} else {
			waiting = true;
			setTimeout(() => {
				waiting = false;
				checkAndWait();
			}, timeLeft);
		}
	};

	return (...args: any[]) => {
		queue.enqueue(() => fn(...args));
		checkAndWait();
	};
};
