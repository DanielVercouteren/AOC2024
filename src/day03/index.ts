import run from "aocrunner"

const parseInput = (rawInput: string) => [
  ...rawInput.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g),
]
const parseInputWithEnabledInstructions = (rawInput) => [
  ...rawInput.matchAll(/(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g),
]

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput)
  let answer: number = 0

  instructions.forEach((instruction) => {
    const [_, left, right] = instruction
    answer += Number(left) * Number(right)
  })

  return answer
}

const part2 = (rawInput: string) => {
  const instructions = parseInputWithEnabledInstructions(rawInput)
  let answer: number = 0
  let shouldSkip = false

  instructions.forEach((instruction) => {
    const [_, __, left, right, enable, disable] = instruction

    if (!!enable) {
      shouldSkip = false
    }
    if (!!disable) {
      shouldSkip = true
    }

    if (!shouldSkip && left && right) {
      answer += Number(left) * Number(right)
    }
  })

  return answer
}

run({
  part1: {
    tests: [
      {
        input:
          "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",

        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input:
          "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
