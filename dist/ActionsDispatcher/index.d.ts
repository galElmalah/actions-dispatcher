declare type Action = (args?: any) => any;
interface Dispatcher<T> {
    register(actionType: keyof T, action: string | Action): void;
    dispatch(actionType: keyof T): void;
}
export declare class ActionsDispatcher<T> implements Dispatcher<T> {
    private actions;
    constructor(defaultAction?: Action);
    setDefaultAction(defaultAction: Action): void;
    register(actionType: keyof T, action: string | Action): void;
    dispatch(actionType: keyof T | string, ...args: any[]): void;
}
export {};
