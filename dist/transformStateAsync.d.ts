interface WrappedReturnState<T> {
    nextState: (state: T) => T;
    value: any;
}
interface StateWrapper<T> {
    (state: T): Promise<WrappedReturnState<T>>;
}
declare const transformStateAsync: <T>(...functions: StateWrapper<T>[]) => (state: T) => Promise<T>;
export default transformStateAsync;
