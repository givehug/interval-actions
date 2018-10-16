import { NodeType } from './node';
declare class Queue {
    first?: NodeType;
    last?: NodeType;
    size: number;
    constructor();
    enqueue(val: NodeType): number;
    dequeue(): NodeType | null;
}
export default Queue;
