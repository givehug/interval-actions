class Node<T> {
    next?: Node<T> = null;
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export default Node;
