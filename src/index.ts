import IntervalActions, {OpsType} from './actions';

export const makeQueue = (interval?: number, ops?: OpsType) => new IntervalActions('queue', interval, ops);
export const makeStack = (interval?: number, ops?: OpsType) => new IntervalActions('stack', interval, ops);
