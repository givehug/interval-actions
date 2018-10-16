import { NodeType } from './node';
declare class Stack {
    first?: NodeType;
    last?: NodeType;
    size: number;
    constructor();
    push(val: NodeType): number;
    pop(): NodeType | null;
}
export default Stack;
