const Node = require('./node');

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
		this.size = 0;
		this.enqueue = this.enqueue.bind(this);
		this.dequeue = this.dequeue.bind(this);
	}
	
    enqueue(val) {
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
	
    dequeue() {
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

module.exports = Queue;
