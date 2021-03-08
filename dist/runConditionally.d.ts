export interface Condition<T> {
    whenTrue: (input: T) => boolean;
    thenDo: (input: T) => Promise<T>;
}
declare const runConditionally: <T>(condition: Condition<T>) => (state: T) => Promise<T>;
export default runConditionally;
