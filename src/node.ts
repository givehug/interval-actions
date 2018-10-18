export type NodeType<T> = {
    next?: NodeType<T>,
    value: any,
};

class Node<T> {
    public next?: NodeType<T> = null;
    public value: any;

    constructor(value: T) {
        this.value = value;
    }
}

export default Node;
