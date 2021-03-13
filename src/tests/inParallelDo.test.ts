import delay from '../delay'
import inParallelDo from '../inParallelDo'

interface State {
  a: number
  b: number
  c: number
}

describe('inParallelDo', () => {
  test('it runs the chain', async () => {
    const state: State = { a: 0, b: 0, c: 0 }

    const f1 = async (_a: State) => {
      await delay(300)
      return { a: 1, b: 0, c: 0 }
    }
    const f2 = async (_a: State) => {
      await delay(200)
      return { a: 0, b: 2, c: 0 }
    }
    const f3 = async (_a: State) => {
      await delay(100)
      return { a: 0, b: 0, c: 3 }
    }

    console.time('inParallelDo')
    expect(await inParallelDo(f1, f2, f3)(state)).toEqual([
      { a: 1, b: 0, c: 0 },
      { a: 0, b: 2, c: 0 },
      { a: 0, b: 0, c: 3 },
    ])
    console.timeEnd('inParallelDo')
  })
})
