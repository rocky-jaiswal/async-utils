import pipeAsync from '../pipeAsync'

describe('pipeAsync', () => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  test('it waits for the chain', async () => {
    const arr: number[] = []

    const f1 = async (a: number[]) => {
      await delay(300)
      a.push(1)
      return a
    }
    const f2 = async (a: number[]) => {
      await delay(200)
      a.push(2)
      return a
    }
    const f3 = async (a: number[]) => {
      await delay(100)
      a.push(3)
      return a
    }

    expect(await pipeAsync(f1, f2, f3)(arr)).toEqual([1, 2, 3])
  })

  test('it waits for the chain even when non-aync', async () => {
    const arr: number[] = []

    const f1 = async (a: number[]) => {
      await delay(300)
      a.push(1)
      return a
    }
    const f2 = async (a: number[]) => {
      await delay(200)
      a.push(2)
      return a
    }
    const f3 = async (a: number[]) => {
      a.push(3)
      return a
    }
    const f4 = async (a: number[]) => {
      await delay(100)
      a.push(4)
      return a
    }

    expect(await pipeAsync(f1, f2, f3, f4)(arr)).toEqual([1, 2, 3, 4])
  })

  test('handles error in the chain', async () => {
    const arr: number[] = []
    const mock = jest.fn()

    const f1 = async (a: number[]) => {
      await delay(300)
      a.push(1)
      return a
    }
    const f2 = async (_a: number[]) => {
      throw new Error('boom!')
    }
    const f3 = async (a: number[]) => {
      mock()
      return a
    }

    await expect(pipeAsync(f1, f2, f3)(arr)).rejects.toBeTruthy()
    expect(mock).not.toHaveBeenCalled()
  })
})
