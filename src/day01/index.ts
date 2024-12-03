import run from "aocrunner"

const prepareLines = (input: string, returnSorted: boolean): [string[], string[]] => {
  let left: string[] = []
  let right: string[] = []

  input.split('\n').map((line) => {
    const [l, r] = line.split('   ')
    left.push(l)
    right.push(r)
  })

  if (returnSorted) {
    left.sort()
    right.sort()
  }

  return [left, right]
}

const part1 = (rawInput: string) => {
  const [left, right] = prepareLines(rawInput, true)
  let answer: number = 0

  for (let i = 0; i < left.length; i++) {
    answer = answer + Math.abs(Number(left[i]) - Number(right[i]))
  }

  return answer
}

const part2 = (rawInput: string) => {
  const [left, right] = prepareLines(rawInput, false)
  let answer = 0

  for (let i = 0; i < left.length; i++) {
    answer += right.filter((r) => r === left[i]).length * Number(left[i])
  }


  return answer
}

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
