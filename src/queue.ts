import Node from './node';

class Queue<T> {
    first?: Node<T> = null;
    last?: Node<T> = null;
    size: number = 0;
	
    enqueue = (val: T): void => {
        const newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.size++;
	};
	
    dequeue = (): T | null => {
        if (!this.first) return null;
        const temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    };
}

export default Queue;
