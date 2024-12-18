import run from "aocrunner"

type Coordinate = { x: number, y: number }
const DIRS: Coordinate[] = [{x: 1, y: 0}, { x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y: -1}]
type CoordinateWithDir = Coordinate & { dir: Coordinate }

const parseInput = (rawInput: string): [Coordinate, Coordinate, string[][]] => {
  let start: Coordinate = {x: 0, y: 0}
  let end: Coordinate = {x: 0, y: 0}
  const grid = rawInput
    .split("\n")
    .map((row, y) => {
      return row.split("").map((cell, x) => {
        if (cell === "S") {
          start = { x, y }
        }
        if (cell === "E") {
          end = { x, y }
        }
        return cell
      })
    })

  return [start, end, grid]
}

type Node = { pos: CoordinateWithDir, path: string[], cost: number }

const findAllPaths = (start: Coordinate, end: Coordinate, grid: string[][]): [number, string[][]] => {
  let queue: Node[] = [{ pos: {...start, dir: DIRS[0]}, path: [], cost: 0 }]
  let current: Node
  let visited: string[] = []
  let paths: string[][] = []
  let minCost = Infinity

  while (current = queue.shift()) {
    current.path.push(`${current.pos.x},${current.pos.y}`)

    if (current.pos.x === end.x && current.pos.y === end.y) {
      if (current.cost < minCost) {
        paths = [current.path]
        minCost = current.cost
      } else if (current.cost === minCost) {
        paths.push(current.path)
      }
      continue
    }

    const pos = `${current.pos.x},${current.pos.y}`

    if (visited[pos] < current.cost) {
      continue
    }

    visited[pos] = current.cost

    if (current.cost > minCost) {
      continue
    }

    let currentDirection = current.pos.dir
    DIRS.forEach((dir) => {
      if (dir.x == -currentDirection.x && dir.y == -currentDirection.y) {
        // No turning back!
        return true
      }

      const nextPos: CoordinateWithDir = {x: current.pos.x + dir.x, y: current.pos.y + dir.y, dir: dir}

      if (grid[nextPos.y][nextPos.x] === "#") {
        return true
      }

      queue.push({
        path: current.path.slice(),
        pos: nextPos,
        cost: current.cost + (JSON.stringify(dir) === JSON.stringify(currentDirection) ? 1 : 1001)
      })
    })
  }

  return [minCost, paths]
}

const part1 = (rawInput: string) => {
  const [start, end, grid] = parseInput(rawInput)
  const [costs] = findAllPaths(start, end, grid)

  return costs
}

const part2 = (rawInput: string) => {
  const [start, end, grid] = parseInput(rawInput)
  const [,paths] = findAllPaths(start, end, grid)
  const uniquePaths: Map<string, number> = new Map()
  paths.forEach(path => path.forEach(cell => uniquePaths.set(cell, (uniquePaths.get(cell) || 0) + 1)))
  return uniquePaths.size + 2
}

run({
  part1: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`,
        expected: 7036,
      },
      {
        input: `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
        expected: 11048
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`,
        expected: 45,
      },
      {
        input: `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
        expected: 64
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
