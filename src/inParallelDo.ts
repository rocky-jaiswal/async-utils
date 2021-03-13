const inParallelDo = <T>(
  ...functions: Array<(state: T) => Promise<T>>
) => async (state: T): Promise<T[]> => {
  const promises = functions.map((fn) => fn(state))

  return Promise.all(promises)
}

export default inParallelDo
