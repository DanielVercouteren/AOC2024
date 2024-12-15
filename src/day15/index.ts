import run from "aocrunner"

const parseInput = (rawInput: string, resize: boolean = false): [string[][], string[]] => {
  const [warehouse, movement] = rawInput.split("\n\n")
  let warehouseMap = warehouse.split("\n").map((row) => row.split(""))
  const movementMap = movement.split("").filter((char) => char !== "\n")

  if (resize) {
    warehouseMap = resizeMap(warehouseMap)
  }

  return [warehouseMap, movementMap]
}

const calculateGPS = (map: string[][]): number => {
  let answer: number = 0

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        answer += 100 * y + x
      }
    }
  }

  return answer
}

const moveBoxes = (map: string[][], guardLocation: [number, number], moves: number, [dx, dy]: [number, number]) => {
  console.log('moving boxes', moves)
  for (let i = moves; i > 1; i--) {
    map[guardLocation[1] + dy * i][guardLocation[0] + dx * i] = "O"
  }
  map[guardLocation[1]][guardLocation[0]] = "."
  map[guardLocation[1] + dy][guardLocation[0] + dx] = "@"
}

const moveMap = (map: string[][], guardLocation: [number, number], move: string) => {
  const [dx, dy] = {
    "^": [0, -1],
    "v": [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
  }[move]

  const newGuardLocation: [number, number] = [guardLocation[0] + dx, guardLocation[1] + dy]

  if (map[newGuardLocation[1]][newGuardLocation[0]] === "#") {
    return
  }

  if (map[newGuardLocation[1]][newGuardLocation[0]] === ".") {
    map[guardLocation[1]][guardLocation[0]] = "."
    map[newGuardLocation[1]][newGuardLocation[0]] = "@"
    guardLocation[0] = newGuardLocation[0]
    guardLocation[1] = newGuardLocation[1]
    return
  }

  if (map[newGuardLocation[1]][newGuardLocation[0]] === "O") {
    let movingBoxes = true
    let moves = 1
    while (movingBoxes) {
      const [newX, newY] = [guardLocation[0] + moves * dx, guardLocation[1] + moves * dy]
      if (map[newY][newX] === "#") {
        movingBoxes = false
      }

      if (map[newY][newX] === ".") {
        moveBoxes(map, guardLocation, moves, [dx, dy])
        guardLocation[0] = newGuardLocation[0]
        guardLocation[1] = newGuardLocation[1]
        movingBoxes = false
      }

      moves++
    }
  }
}

const getStartingLocation = (map: string[][]): [number, number] => {
  let robotGuardLocation: [number, number] = [0, 0]

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "@") {
        robotGuardLocation = [x, y]
        return robotGuardLocation
      }
    }
  }
}

  const part1 = (rawInput: string) => {
    const [warehouseMap, movementMap] = parseInput(rawInput)
    let robotGuardLocation = getStartingLocation(warehouseMap)

    for (const movement of movementMap) {
      moveMap(warehouseMap, robotGuardLocation, movement)
    }

    return calculateGPS(warehouseMap)
  }

  const resizeMap = (map: string[][]) => {
    let newMap: string[][] = []

    for (let y = 0; y < map.length; y++) {
      newMap.push([])
      for (let x = 0; x < map[y].length; x++) {
        switch(map[y][x]) {
          case '#':
            newMap[y].push('#', '#')
            break
          case 'O':
            newMap[y].push('[', ']')
            break
          case '.':
            newMap[y].push('.', '.')
            break
          case '@':
            newMap[y].push('@', '.')
            break
        }
      }
    }

    return newMap
  }

  const part2 = (rawInput: string) => {
    const [warehouseMap, movementMap] = parseInput(rawInput, true)
    // let robotGuardLocation = getStartingLocation(warehouseMap)

    for (const movement of movementMap) {
      // moveMap(warehouseMap, robotGuardLocation, movement)
    }

    return calculateGPS(warehouseMap)
  }

  run({
    part1: {
      tests: [
        {
          input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
          expected: 2028
        },
      ],
      solution: part1,
    },
    part2: {
      tests: [
        {
          input: `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`,
          expected: 618,
        },
      ],
      solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
  })
