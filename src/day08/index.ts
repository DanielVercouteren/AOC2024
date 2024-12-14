import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n').map((line) => line.split(''));

const fetchAntennas = (map: string[][]) => {
  const antennas: Map<string, number[][]> = new Map()

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== '.') {
        if (!antennas.has(map[i][j])) {
          antennas.set(map[i][j], []);
        }

        antennas.get(map[i][j])!.push([i, j]);
      }
    }
  }

  return antennas;
}

const getUniqueCombinations = (coordinates: number[][]) => {
  const pairs: number[][][] = [];

  for (let i = 0; i < coordinates.length - 1; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      pairs.push([coordinates[i], coordinates[j]]);
    }
  }

  return pairs;
}

const getCoordinatesOfAntinodes = (a: number[], b: number[]) => {
  const first = [(a[0] - 2 * b[0]) / -1, (a[1] - 2 * b[1]) / -1]
  const second = [(b[0] - 2 * a[0]) / -1, (b[1] - 2 * a[1]) / -1]

  return [first, second]
}

const isInBoundaries = (map: string[][], pair: number[]) => {
  return pair[0] >= 0 && pair[0] < map.length && pair[1] >= 0 && pair[1] < map[0].length;
}

const getPrevAntinode = (i: number, j: number, diffI: number, diffJ: number) => {
  return [i - diffI, j - diffJ];
}

const getNextAntinode = (i: number, j: number, diffI: number, diffJ: number) => {
  return [i + diffI, j + diffJ];
}


const part1 = (rawInput: string) => {
  const map = parseInput(rawInput)
  const antennas = fetchAntennas(map)
  const antinodesSet = new Set()

  for (const value of antennas.values()) {
    const combinations = getUniqueCombinations(value);
    for (const pair of combinations) {
      const antinodes = getCoordinatesOfAntinodes(pair[0], pair[1]);

      if (isInBoundaries(map, antinodes[0])) {
        antinodesSet.add(`${antinodes[0][0]}:${antinodes[0][1]}`);
      }

      if (isInBoundaries(map, antinodes[1])) {
        antinodesSet.add(`${antinodes[1][0]}:${antinodes[1][1]}`);
      }
    }
  }

  return antinodesSet.size;
}

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput)
  const antennas = fetchAntennas(map)
  const antinodesSet = new Set()

  for(const value of antennas.values()) {
    const combinations = getUniqueCombinations(value)

    for(const pair of combinations) {
      const up = pair[0][0] < pair[0][1] ? pair[0] : pair[1]
      const down = pair[0][0] < pair[0][1] ? pair[1] : pair[0]
      const diffI = up[0] - down[0]
      const diffJ = up[1] - down[1]

      let upPair = getPrevAntinode(up[0], up[1], diffI, diffJ)
      let downPair = getNextAntinode(down[0], down[1], diffI, diffJ)

      while (isInBoundaries(map, upPair)) {
        antinodesSet.add(`${upPair[0]}:${upPair[1]}`)
        upPair = getPrevAntinode(upPair[0], upPair[1], diffI, diffJ)
      }

      while (isInBoundaries(map, downPair)) {
        antinodesSet.add(`${downPair[0]}:${downPair[1]}`)
        downPair = getNextAntinode(downPair[0], downPair[1], diffI, diffJ)
      }
    }
  }

  return antinodesSet.size

}

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
