import run from "aocrunner"

type Coordinate = {
  x: number
  y: number
}

const parseInput = (rawInput: string, MEMORY_SPACE: number): [Coordinate[], string[][]] => {
  const fallingBytes: Coordinate[] = rawInput.split('\n').map((line) => ({x: Number(line.split(',')[0]), y: Number(line.split(',')[1])}))
  const grid: string[][] = Array.from({ length: MEMORY_SPACE }, () => Array.from({ length: MEMORY_SPACE }, () => '.'))
  return [fallingBytes, grid]
}

const calculateShortestRoute = (grid: string[][], MEMORY_SPACE: number): number => {
  const start: Coordinate = { x: 0, y: 0 }
  const end: Coordinate = { x: MEMORY_SPACE -1, y: MEMORY_SPACE -1 }

  const queue: Coordinate[] = [start];
  const visited: Set<string> = new Set();
  const connectedCoordinates: Map<string, string> = new Map()

  const directions: Coordinate[] = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 },  // right
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
  ]

  visited.add(`${start.x},${start.y}`)

  while (queue.length) {
    const { x: cX, y: cY } = queue.shift()

    if (cX === end.x && cY === end.y) {
      const path: Coordinate[] = []
      let current = `${end.x},${end.y}`

      while (current) {
        const [x, y] = current.split(",").map(Number)
        path.unshift({ x, y })

        if (current === `${start.x},${start.y}`) {
          break
        }

        current = connectedCoordinates.get(current)
      }

      return path.length - 1
    }

    for (const { x: dX, y: dY } of directions) {
      const nX = cX + dX
      const nY = cY + dY

      if (nX < 0 || nX >= grid[0].length || nY < 0 || nY >= grid.length) {
        continue
      }

      if (grid[nY][nX] === "#" || visited.has(`${nX},${nY}`)) {
        continue
      }

      visited.add(`${nX},${nY}`)
      queue.push({ x: nX, y: nY })

      connectedCoordinates.set(`${nX},${nY}`, `${cX},${cY}`)
    }
  }
}

const part1 = (rawInput: string) => {
  const MEMORY_SPACE = 71
  const [fallingBytes, grid] = parseInput(rawInput, MEMORY_SPACE)
  const steps = 1024

  for (let i = 0; i < steps; i++) {
    grid[fallingBytes[i].y][fallingBytes[i].x] = '#'
  }

  return calculateShortestRoute(grid, MEMORY_SPACE)
}

const part2 = (rawInput: string) => {
  const MEMORY_SPACE = 71
  const [fallingBytes, grid] = parseInput(rawInput, MEMORY_SPACE)
  let answer: string

  for (let i = 0; i < fallingBytes.length; i++) {
    grid[fallingBytes[i].y][fallingBytes[i].x] = '#'
    const shortestRoute = calculateShortestRoute(grid, MEMORY_SPACE)

    if (shortestRoute === undefined) {
      answer = `${fallingBytes[i].x},${fallingBytes[i].y}`
      break
    }
  }

  return answer
}

run({
  part1: {
    tests: [
//       {
//         input: `5,4
// 4,2
// 4,5
// 3,0
// 2,1
// 6,3
// 2,4
// 1,5
// 0,6
// 3,3
// 2,6
// 5,1
// 1,2
// 5,5
// 2,5
// 6,5
// 1,4
// 0,4
// 6,4
// 1,1
// 6,1
// 1,0
// 0,5
// 1,6
// 2,0`,
//         expected: 22,
//       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
