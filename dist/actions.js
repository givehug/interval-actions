"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create actions queue or stack (eg async actions).
 * Execute each function with given interval.
 */
const stack_1 = __importDefault(require("./stack"));
const queue_1 = __importDefault(require("./queue"));
const defaultOps = {
    executeOnAdd: true,
    delayFirstAction: false,
    whenEmpty: null
};
class IntervalActions {
    constructor(mode, interval = 0, ops) {
        this.props = {
            mode,
            interval,
            ops: Object.assign({}, defaultOps, ops),
            waiting: false,
            paused: false,
            timer: null,
            collection: mode === 'stack' ? new stack_1.default() : new queue_1.default,
        };
        this.addToCollection = this.props.collection instanceof stack_1.default
            ? this.props.collection.push
            : this.props.collection.enqueue;
        this.removeFromCollection = this.props.collection instanceof stack_1.default
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
    invoke(interval) {
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
        }
        else {
            this.props.ops.whenEmpty && this.props.ops.whenEmpty();
            this.clearTimer();
        }
    }
    clearTimer() {
        this.props.waiting = false;
        this.props.timer && clearTimeout(this.props.timer);
    }
    add(func) {
        this.addToCollection(func);
        this.props.ops.executeOnAdd && this.invoke(this.props.ops.delayFirstAction ? this.props.interval : 0);
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
        this.props.collection = this.props.mode === 'stack' ? new stack_1.default() : new queue_1.default;
        this.clearTimer();
    }
}
exports.default = IntervalActions;
