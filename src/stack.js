const Node = require('./node');

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
		this.size = 0;
		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
	}
	
    push(val) {
        const newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            const temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
	}

    pop() {
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

module.exports = Stack;
