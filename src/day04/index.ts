import run from "aocrunner"

const parseInput = (rawInput: string): string[][] => rawInput.split('\n').map(row => row.split(''))
const directions = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
] as const;

function isInvalidCharacter(grid: string[][], char: string, row: number, col: number) {
  try {
    return grid[row][col] !== char;
  } catch {
    return true;
  }
}
const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)
  let result = 0
  // let horizontalXmasCount: number = 0
  // let verticalXmasCount: number = 0
  // let diagonalXmasCount: number = 0
  //
  // const horizontalLines = rawInput.split('\n')
  // for (let i = 0; i < horizontalLines.length; i++) {
  //   horizontalXmasCount += findXmasInString(horizontalLines[i])
  // }
  //
  // for(let i = 0; i < horizontalLines[0].length; i++) {
  //   const line: string[] = []
  //   for (let j = 0; j < horizontalLines.length; j++) {
  //     line.push(horizontalLines[j][i])
  //   }
  //   verticalXmasCount += findXmasInString(line.join(''))
  // }
  //
  // const startingPoints: number[][] = []
  // for (let x = 0; x < horizontalLines[0].length; x++) {
  //   for (let y = 0; y < horizontalLines.length; y++) {
  //     if (input[x][y] === 'X') {
  //       startingPoints.push([x, y])
  //     }
  //   }
  // }
  // startingPoints.forEach(([x, y]) => {
  //   if

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      for (const dir of directions) {
        let isTargetWord = true;

        for (let k = 0; k < 4; k++) {
          if (isInvalidCharacter(grid, 'XMAS'[k], row + k * dir[0], col + k * dir[1])) {
            isTargetWord = false;
            break;
          }
        }

        if (isTargetWord) {
          result += 1;
        }
      }
    }
  }




  return result
}

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput)
  let answer: number = 0

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 'A') {// Check for A
        try {
          const surroundings = [grid[x - 1][y - 1], grid[x - 1][y + 1], grid[x + 1][y - 1], grid[x + 1][y + 1]].join('')
          if(surroundings === 'MSMS' || surroundings === 'MMSS' || surroundings === 'SMSM' || surroundings === 'SSMM') {
            answer++
          }
        } catch {
          break
        }
      }
    }
  }

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
