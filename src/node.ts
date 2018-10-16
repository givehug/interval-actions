export type NodeType = {
    next?: NodeType,
    value: any,
};

class Node {
    public next?: NodeType = null;
    public value: any;

    constructor(value: any) {
        this.value = value;
    }
}

export default Node;
