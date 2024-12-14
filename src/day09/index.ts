import run from "aocrunner"

const parseInput = (rawInput: string): [Array<number|string>, number] => {
  let line = []
  let highestIndex = 0
  rawInput.split('').map((x, i) => {
    const isFile = i % 2 === 0

    for (let n = 0; n < Number(x); n++) {
      if (isFile) {
        highestIndex = i / 2
        line.push(i / 2)
      } else {
        line.push('.')
      }
    }
  })
  return [line, highestIndex]
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)[0]

  for (let i = input.length - 1; i>=0; i--) {
    if (input[i] !== '.') {
      const indexOfFirstDot = input.findIndex(x => x === '.')

      if (indexOfFirstDot < i) {
        input[indexOfFirstDot] = input[i]
        input[i] = '.'
      }
    }
  }

  return input.filter(x => x !== '.').reduce((acc, x, i) => {
    return Number(acc) + Number(x) * i
  }, 0) as number
}

const part2 = (rawInput: string) => {
  const [input, highestIndex] = parseInput(rawInput)

  let answer: number = 0

  const findAndReplace = (length: number, replaceNumber: number) => {
    const findString = '.'.repeat(length)
    const indexToReplace = input.join('').indexOf(findString)
    const indexOfNumber = input.join('').indexOf(`${replaceNumber}`)
    if (indexToReplace !== -1 && indexToReplace < indexOfNumber ) {
      for (let i = indexToReplace; i < indexToReplace + length; i++) {
        input[i] = replaceNumber
      }
      for (let i = indexOfNumber; i < indexOfNumber + length; i++) {
        input[i] = '.'
      }
      answer++
    }
  }

  for (let i = highestIndex; i > 0; i--) {
    const lengthOfIndex = input.filter(x => x === i).length
    findAndReplace(lengthOfIndex, i)
  }

  answer = input.reduce((acc, x, i) => {
    if (x === '.') return acc
    return Number(acc) + Number(x) * i
  }, 0) as number

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
      {
        input: '12345',
        expected: 60
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
      {
        input: '12345',
        expected: 132
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
