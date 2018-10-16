"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = __importDefault(require("./actions"));
exports.makeQueue = (interval, ops) => new actions_1.default('queue', interval, ops);
exports.makeStack = (interval, ops) => new actions_1.default('stack', interval, ops);
