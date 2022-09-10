import delay from '../delay'
import transformStateAsync from '../transformStateAsync'

describe('transformStateAsync', () => {
  test('it waits for the chain', async () => {
    class State {
      public readonly numbers: number[]

      constructor() {
        this.numbers = []
      }

      addNumber(num: number) {
        this.numbers.push(num)
      }
    }

    const f1 = async (a: State) => {
      await delay(300)
      console.log('in f1')
      console.log({ a })

      return {
        nextState: (state: State) => {
          state.addNumber(1)
          return state
        },
        value: 'f1'
      }
    }

    const f2 = async (a: State) => {
      await delay(300)
      console.log('in f2')
      console.log({ a })

      return {
        nextState: (state: State) => {
          state.addNumber(2)
          return state
        },
        value: 'f2'
      }
    }

    const f3 = async (a: State) => {
      let n: number = 0
      const foo = async () => {
        await delay(300)
        n = a.numbers[0] + 33
      }
      await foo()
      console.log('in f3')
      console.log({ a })

      return {
        nextState: (state: State) => {
          state.addNumber(n)
          return state
        },
        value: 'f3'
      }
    }

    expect((await transformStateAsync(f1, f2, f3)(new State())).numbers).toEqual([1, 2, 34])
  })

  test('it waits for the chain even when non-aync', async () => {
    const arr: number[] = []

    const f1 = async (a: number[]) => {
      await delay(300)
      console.log('in f1')
      console.log({ a })

      return {
        nextState: (a: number[]) => {
          a.push(1)
          return a
        },
        value: 'f1'
      }
    }

    const f2 = async (a: number[]) => {
      await delay(300)
      console.log('in f2')
      console.log({ a })

      return {
        nextState: (a: number[]) => {
          a.push(2)
          return a
        },
        value: 'f2'
      }
    }

    const f3 = async (a: number[]) => {
      console.log('in f3')
      console.log({ a })

      return {
        nextState: (a: number[]) => {
          a.push(3)
          return a
        },
        value: 'f3'
      }
    }

    expect(await transformStateAsync(f1, f2, f3)(arr)).toEqual([1, 2, 3])
  })

  test('it handles errors', async () => {
    const arr: number[] = []
    const mock = jest.fn()

    const f1 = async (a: number[]) => {
      await delay(300)
      console.log('in f1')
      console.log({ a })

      return {
        nextState: (a: number[]) => {
          a.push(1)
          return a
        },
        value: 'f1'
      }
    }

    const f2 = async (_a: number[]) => {
      throw new Error('boom!')
    }

    const f3 = async (a: number[]) => {
      console.log('in f3')
      console.log({ a })
      mock()

      return {
        nextState: (a: number[]) => {
          a.push(3)
          return a
        },
        value: 'f3'
      }
    }

    await expect(transformStateAsync(f1, f2, f3)(arr)).rejects.toBeTruthy()
    expect(mock).not.toHaveBeenCalled()
  })
})
