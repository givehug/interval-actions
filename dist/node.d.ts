export declare type NodeType = {
    next?: NodeType;
    value: any;
};
declare class Node {
    next?: NodeType;
    value: any;
    constructor(value: any);
}
export default Node;
