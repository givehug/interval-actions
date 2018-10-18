import Node, {NodeType} from './node';

class Queue<T> {
    first?: NodeType<T>;
    last?: NodeType<T>;
    size: number;

    constructor() {
        this.first = null;
        this.last = null;
		this.size = 0;
		this.enqueue = this.enqueue.bind(this);
		this.dequeue = this.dequeue.bind(this);
	}
	
    enqueue(val: T) {
        const newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
	}
	
    dequeue(): T | null {
        if (!this.first) return null;
        const temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}

export default Queue;
