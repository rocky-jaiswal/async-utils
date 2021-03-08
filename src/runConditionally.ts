export interface Condition<T> {
  whenTrue: (input: T) => boolean
  thenDo: (input: T) => Promise<T>
}

const runConditionally = <T>(condition: Condition<T>) => async (state: T) => {
  if (condition.whenTrue(state)) {
    return await condition.thenDo(state)
  }

  return state
}

export default runConditionally
