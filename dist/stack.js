"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./node"));
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
        this.push = this.push.bind(this);
        this.pop = this.pop.bind(this);
    }
    push(val) {
        const newNode = new node_1.default(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        }
        else {
            const temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    }
    pop() {
        if (!this.first)
            return null;
        const temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}
exports.default = Stack;
