import run from "aocrunner"

type Coordinate = {
  X: number
  Y: number
}

type Game = {
  buttonA: Coordinate
  buttonB: Coordinate
  prize: Coordinate
}

const parseInput = (rawInput: string): Game[] => {
  const input = rawInput.split('\n\n')
  let games: Game[] = []

  input.forEach((game) => {
    const buttonA = game.split('\n')[0].split(': ')[1]
    const buttonB = game.split('\n')[1].split(': ')[1]
    const prize = game.split('\n')[2].split(': ')[1]

    games.push({
      buttonA: {
        X: Number(buttonA.split(', ')[0].split('+')[1]),
        Y: Number(buttonA.split(', ')[1].split('+')[1])
      },
      buttonB: {
        X: Number(buttonB.split(', ')[0].split('+')[1]),
        Y: Number(buttonB.split(', ')[1].split('+')[1])
      },
      prize: {
        X: Number(prize.split(', ')[0].split('=')[1]),
        Y: Number(prize.split(', ')[1].split('=')[1])
      }
    })
  })

  return games
}

const calculatePresses = (buttonA: Coordinate, buttonB: Coordinate, prize: Coordinate): number => {
  const bPresses = (buttonA.X * prize.Y - buttonA.Y * prize.X) / (buttonB.Y * buttonA.X - buttonB.X * buttonA.Y)
  const aPresses = (prize.X - buttonB.X * bPresses) / buttonA.X

  if (aPresses % 1 === 0 && bPresses % 1 === 0) {
    return 3 * aPresses + bPresses
  }

  return 0
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let answer: number = 0

  input.forEach(({ buttonA, buttonB, prize }) => {
    answer += calculatePresses(buttonA, buttonB, prize)
  })

  return answer
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let answer: number = 0

  input.forEach(({ buttonA, buttonB, prize }) => {
    const convertedPrize: Coordinate = {
      X: 10000000000000 + prize.X,
      Y: 10000000000000 + prize.Y
    }
    answer += calculatePresses(buttonA, buttonB, convertedPrize)
  })


  return answer
}

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=10000000008400, Y=10000000005400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=10000000012748, Y=10000000012176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=10000000007870, Y=10000000006450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=10000000018641, Y=10000000010279`,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
