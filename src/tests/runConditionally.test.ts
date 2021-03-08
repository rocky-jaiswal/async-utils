import pipeAsync from '../pipeAsync'
import runConditionally from '../runConditionally'

describe('runConditionally', () => {
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

    const res = await runConditionally<number[]>({
      whenTrue: (_: number[]) => true,
      thenDo: pipeAsync(f1, f2, f3),
    })(arr)

    expect(res).toEqual([1, 2, 3])
  })
})
