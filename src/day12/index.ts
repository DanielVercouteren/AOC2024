import run from "aocrunner"

const DIRS = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
}

const parseInput = (rawInput: string) => rawInput.split('\n').map(row => row.split(''))

const getConnectedCoordinates = (input: string[][], x: number, y: number, area: Set<string>) => {
  if (area.has(`${x},${y}`)) return
  area.add(`${x},${y}`)

  const width = input[0].length
  const height = input.length
  const plant = input[y][x]

  if (y !== 0 && input[y - 1][x] === plant) {
    getConnectedCoordinates(input,x, y - 1, area)
  }

  if (y !== height - 1 && input[y + 1][x] === plant) {
    getConnectedCoordinates(input, x, y + 1, area)
  }

  if (x !== 0 && input[y][x - 1] === plant) {
    getConnectedCoordinates(input, x - 1, y, area)
  }

  if (x !== width - 1 && input[y][x + 1] === plant) {
    getConnectedCoordinates(input, x + 1, y, area)
  }
}

const getPerimeter = (region: Set<string> ) => {
  let perimeter = 0

  region.forEach(block=> {
    let fences = 4
    const [x, y] = block.split(',').map(Number)

    for(const [dX, dY] of Object.values(DIRS)) {
      const neighbor = [x + dX, y + dY].join(',')
      if (region.has(neighbor)) {
        fences--
      }
    }
    perimeter += fences
  })
  return perimeter
}

const getFenceLocations = (region: Set<string>, location: string) => {
  const [x, y] = location.split(',').map(Number)
  let topFence = true
  let bottomFence = true
  let leftFence = true
  let rightFence = true

  for(const [dX, dY] of Object.values(DIRS)) {
    const index = Object.values(DIRS).findIndex(([dx, dy]) => dx === dX && dy === dY)
    const neighbor = [x + dX, y + dY].join(',')
    if (region.has(neighbor)) {
      switch(index) {
        case 0:
          topFence = false
          break
        case 1:
          bottomFence = false
          break
        case 2:
          leftFence = false
          break
        case 3:
          rightFence = false
          break
      }
    }
  }

  return [
    topFence,
    bottomFence,
    leftFence,
    rightFence
  ]
}

const getFences = (region: Set<string>, perimeter: number) => {
  let neededFences = perimeter

  region.forEach(block => {
    const [x, y] = block.split(',').map(Number)
    const [topFence, bottomFence, leftFence, rightFence] = getFenceLocations(region, block)

    if (region.has(`${x - 1},${y}`)) {
      const [topFenceNeighbor, bottomFenceNeighbor] = getFenceLocations(region, `${x-1},${y}`)

      if (topFence && topFenceNeighbor) neededFences--
      if (bottomFence && bottomFenceNeighbor) neededFences--
    }

    if (region.has(`${x},${y - 1}`)) {
      const [,,leftFenceNeighbor, rightFenceNeighbor] = getFenceLocations(region, `${x},${y-1}`)

      if (leftFence && leftFenceNeighbor) neededFences--
      if (rightFence && rightFenceNeighbor) neededFences--
    }
  })

  return neededFences
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let floodedCoordinates = new Set<string>()
  let answer: number = 0

  for (const [y, line] of input.entries()) {
    for (const [x] of line.entries()) {
      if (!floodedCoordinates.has(`${x},${y}`)) {
        let visited = new Set<string>()
        getConnectedCoordinates(input, x, y, visited)
        const area = visited.size
        const perimeter = getPerimeter(visited)
        visited.forEach(coord => floodedCoordinates.add(coord))

        answer += area * perimeter
      }
    }
  }

  return answer
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let floodedCoordinates = new Set<string>()
  let answer: number = 0

  for (const [y, line] of input.entries()) {
    for (const [x] of line.entries()) {
      if (!floodedCoordinates.has(`${x},${y}`)) {
        let visited = new Set<string>()
        getConnectedCoordinates(input, x, y, visited)
        const area = visited.size
        const perimeter = getPerimeter(visited)
        const fences = getFences(visited, perimeter)

        visited.forEach(coord => floodedCoordinates.add(coord))

        answer += area * fences
      }
    }
  }

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 772,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC
`,
        expected: 80,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 436
      },
      {
        input: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
        expected: 236
      },
      {
        input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
        expected: 368
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`,
        expected: 1206,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
