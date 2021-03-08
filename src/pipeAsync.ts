const pipeAsync = <T>(...functions: Array<(state: T) => Promise<T>>) => async (
  state: T | Promise<T>
): Promise<T> =>
  functions.reduce(
    async (result: T | Promise<T>, next: (state: T) => Promise<T>) =>
      next(await result),
    state
  )

export default pipeAsync
