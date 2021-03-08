declare const _default: {
    pipeAsync: <T>(...functions: ((state: T) => Promise<T>)[]) => (state: T | Promise<T>) => Promise<T>;
    runConditionally: <T_1>(condition: import("./runConditionally").Condition<T_1>) => (state: T_1) => Promise<T_1>;
};
export default _default;
