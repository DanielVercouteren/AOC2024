import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n').map(row => row.split(''))

const DIRS = {
  "UP": [0, -1],
  "RIGHT": [1, 0],
  "DOWN": [0, 1],
  "LEFT": [-1, 0],
}

const part1 = (rawInput: string) => {
  let map = parseInput(rawInput)
  const rows = rawInput.split('\n')
  let guardLocation: [number, number] = [rows[rows.findIndex(row => row.includes('^'))].indexOf('^'), rows.findIndex(row => row.includes('^'))]
  let direction = DIRS.UP

  while(true) {
    const [x, y] = guardLocation
    const [dx, dy] = direction
    const nextLocation: [number, number] = [x + dx, y + dy]

    if (nextLocation[0] < 0 || nextLocation[0] >= map[0].length || nextLocation[1] < 0 || nextLocation[1] >= map.length) {
      break;
    }

    if (map[nextLocation[1]][nextLocation[0]] === '#') {
      direction = direction === DIRS.UP ? DIRS.RIGHT : direction === DIRS.RIGHT ? DIRS.DOWN : direction === DIRS.DOWN ? DIRS.LEFT : DIRS.UP
    } else {
      map[y][x] = 'X'
      guardLocation = nextLocation
    }
  }

  return map.flat().filter(cell => cell === 'X').length + 1
}

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput)
  const rows = rawInput.split('\n')
  const startLocation: [number, number] = [rows[rows.findIndex(row => row.includes('^'))].indexOf('^'), rows.findIndex(row => row.includes('^'))]
  let answer = 0

  const testMapEscape = (x: number, y: number): boolean => {
    let guardLocation = startLocation
    let direction = DIRS.UP
    const testMap = JSON.parse(JSON.stringify(map))
    testMap[x][y] = '#'

    let steps = 0;
    let isEscaped = false

    while(true) {
      const [gX, gY] = guardLocation
      const [dx, dy] = direction
      const nextLocation: [number, number] = [gX + dx, gY + dy]

      if (nextLocation[0] < 0 || nextLocation[0] >= testMap[0].length || nextLocation[1] < 0 || nextLocation[1] >= testMap.length) {
        isEscaped = true
        break;
      }

      if (testMap[nextLocation[1]][nextLocation[0]] === '#') {
        direction = direction === DIRS.UP ? DIRS.RIGHT : direction === DIRS.RIGHT ? DIRS.DOWN : direction === DIRS.DOWN ? DIRS.LEFT : DIRS.UP
      } else {
        guardLocation = nextLocation
        steps++
      }

      if (steps > 6e3) {
        break;
      }
    }

    return isEscaped
  }

  for(let x = 0; x < map[0].length; x++) {
    for(let y = 0; y < map.length; y++) {
      const guardEscaped: boolean = testMapEscape(x, y)

      if (!guardEscaped) {
        answer++
      }
    }
  }

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
