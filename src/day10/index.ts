import run from "aocrunner"

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]

const parseInput = (rawInput: string) => rawInput.split(`\n`).map(x => x.split('').map(Number));


const checkPaths = (grid: number[][], x: number, y: number, peaks: number[][]) => {
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const nX = x + DIRECTIONS[i][0]
    const nY = y + DIRECTIONS[i][1]
    const nextCell = grid[nX]?.[nY]
    if (nextCell === grid[x][y] + 1) {
      if (nextCell === 9) {
        peaks.push([nX, nY])
      } else {
        checkPaths(grid, nX, nY, peaks)
      }
    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let answer: number = 0

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[x][y] === 0) {
        const peaks = []
        checkPaths(input, x, y, peaks)
        answer += [...new Set(peaks.map(x => x.join(',')))].length
      }
    }
  }

  return answer
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let answer: number = 0

  for (let i = 0; i < input.length; ++i) {
    for (let j = 0; j < input[0].length; ++j) {
      if (input[i][j] === 0) {
        const peaks = []
        checkPaths(input, i, j, peaks)
        answer += peaks.length;
      }
    }
  }

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
