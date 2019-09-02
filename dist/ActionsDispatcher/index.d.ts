declare type Action = (args?: any) => any;
interface Dispatcher<T> {
    register(actionType: keyof T, action: string | Action): void;
    dispatch(actionType: keyof T): void;
}
export declare class ActionsDispatcher<T> implements Dispatcher<T> {
    private actions;
    constructor(defaultAction?: Action);
    register(actionType: keyof T, action: string | Action): void;
    dispatch(actionType: keyof T, args?: any): void;
}
export {};
