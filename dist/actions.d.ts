export declare type OpsType = {
    executeOnAdd?: boolean;
    delayFirstAction?: boolean;
    whenEmpty?: Function;
};
declare class IntervalActions {
    private props;
    private addToCollection;
    private removeFromCollection;
    constructor(mode: string, interval: number, ops: OpsType);
    readonly isPaused: boolean;
    readonly length: number;
    readonly size: number;
    private invoke;
    private clearTimer;
    add(func: Function): void;
    execute(): void;
    pause(): void;
    clear(): void;
}
export default IntervalActions;
