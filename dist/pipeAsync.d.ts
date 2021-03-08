declare const pipeAsync: <T>(...functions: ((state: T) => Promise<T>)[]) => (state: T | Promise<T>) => Promise<T>;
export default pipeAsync;
