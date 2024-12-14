import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n')

const calculateOutcome = (operators: string, numbers: number[]) => {
  let result = numbers[0];
  let numberIndex = 1;

  for (let x = 0; x < operators.length; x++) {
    const operator = operators[x];
    const currentNumber = numbers[numberIndex];

    switch (operator) {
      case '*':
        result *= currentNumber
        break
      case '+':
        result += currentNumber
        break
      case '|':
        result = Number.parseInt(`${result}${currentNumber}`)
        break
    }

    numberIndex++
  }

  return result
};

const testPermutations = (numbers: number[], compare: number) => {
  const operators = numbers.length - 1
  const chars = ['*', '+', '|']

  const totalPermutations = Math.pow(3, operators)

  for (let i = 0; i < totalPermutations; i++) {
    let num = i;
    let perm = '';

    for (let j = 0; j < operators; j++) {
      perm = chars[num % 3] + perm
      num = Math.floor(num / 3)
    }

    if (calculateOutcome(perm, numbers) === compare) {
      return true
    }
  }

  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0;

  for (const line of input) {
    const [resultStr, numbersStr] = line.split(':')
    const result = Number(resultStr)
    const numbers = numbersStr
      .split(' ')
      .splice(1)
      .map((x) => Number(x))

    if (testPermutations(numbers, result)) {
      sum += result
    }
  }

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0;

  for (const line of input) {
    const [result, nums] = line.split(':')
    const numbers = nums
      .split(' ')
      .splice(1)
      .map((x) => Number(x))

    if (testPermutations(numbers, Number(result))) {
      sum += Number(result)
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
