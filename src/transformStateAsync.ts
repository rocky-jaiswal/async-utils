/* eslint-disable indent */
interface WrappedReturnState<T> {
  nextState: (state: T) => T
  value: any
}

interface StateWrapper<T> {
  (state: T): Promise<WrappedReturnState<T>>
}

const transformStateAsync =
  <T>(...functions: Array<StateWrapper<T>>) =>
  async (state: T): Promise<T> => {
    let s = state
    for (const fn of functions) {
      const result = await fn(s)
      s = result.nextState(s)
    }
    return s
  }

export default transformStateAsync
