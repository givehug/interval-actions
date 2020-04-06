import Node from './node';

export default class Queue<T> {
  private first?: Node<T> = null;
  private last?: Node<T> = null;
  private _size: number = 0;

  get size() {
    return this._size;
  }

  enqueue = (val: T): void => {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this._size++;
  };

  dequeue = (): T | null => {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this._size--;
    return temp.value;
  };
}
