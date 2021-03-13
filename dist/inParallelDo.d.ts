declare const inParallelDo: <T>(...functions: ((state: T) => Promise<T>)[]) => (state: T) => Promise<T[]>;
export default inParallelDo;
