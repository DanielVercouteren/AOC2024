import run from "aocrunner"

const DIRS: Coordinate[] = [{x: 1, y: 0}, { x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y: -1}]
type Coordinate = { x: number, y: number }
type CoordinateWithDir = Coordinate & { dir: Coordinate }
type Node = { pos: CoordinateWithDir, path: string[], cost: number }

const findAllPaths = (start: Coordinate, end: Coordinate, grid: string[][], costCap: number = Infinity): [number, string[][]] => {
  let queue: Node[] = [{ pos: {...start, dir: DIRS[0]}, path: [], cost: 0 }]
  let current: Node
  let visited: string[] = []
  let paths: string[][] = []
  let minCost = costCap

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

    if (current.cost > minCost || current.cost >= costCap) {
      continue
    }

    let currentDirection = current.pos.dir
    DIRS.forEach((dir) => {
      if (dir.x == -currentDirection.x && dir.y == -currentDirection.y) {
        // No turning back!
        return true
      }

      const nextPos: CoordinateWithDir = {x: current.pos.x + dir.x, y: current.pos.y + dir.y, dir: dir}

      if (grid[nextPos.y] && grid[nextPos.y][nextPos.x] === "#") {
        return true
      }

      queue.push({
        path: current.path.slice(),
        pos: nextPos,
        cost: current.cost + 1
      })
    })
  }

  return [minCost, paths]
}

const parseInput = (rawInput: string): [Coordinate, Coordinate, string[][]] => {
  const grid = rawInput.trim().split("\n").map((line) => line.split(""))
  let start: Coordinate = { x: 0, y: 0 }
  let end: Coordinate = { x: 0, y: 0 }
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "S") {
        start = { x, y }
      } else if (grid[y][x] === "E") {
        end = { x, y }
      }
    }
  }

  return [start, end, grid]
}

const part1 = (rawInput: string) => {
  const [start, end, grid] = parseInput(rawInput)
  const [standardCosts] = findAllPaths(start, end, grid)
  let answer = 0

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === '#') {
        const testGrid = grid.map(row => [...row])
        testGrid[y][x] = '.'
        const [costs] = findAllPaths(start, end, testGrid, standardCosts - 99)
        const saving = standardCosts - costs
        if (saving >= 100) {
          answer += 1
        }
      }
    }
  }

  return answer
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let answer: number = 0

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
        expected: 0,
      }
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
