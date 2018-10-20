export default class Node<T> {
    next?: Node<T> = null;

    constructor(public value: T) {}
}
