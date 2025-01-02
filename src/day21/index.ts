import run from "aocrunner"

const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]
const DIRS_LIT = ['^', '>', 'v', '<']
const numpad = [['#', '#', '#', '#', '#'], ['#', '7', '8', '9', '#'], ['#', '4', '5', '6', '#'], ['#', '1', '2', '3', '#'], ['#', '#', '0', 'A', '#'], ['#', '#', '#', '#', '#']]
const dirpad = [['#', '#', '#', '#', '#'], ['#', '#', '^', 'A', '#'], ['#', '<', 'v', '>', '#'], ['#', '#', '#', '#', '#']]

const findShortestPath = (map: string[][], startVal: string, endVal: string) => {
  let start = [];
  map.forEach((row, y) => row.forEach((v, x) => {
    if (v == startVal) start = [x, y];
  }))
  let stack = [{p: start, path: [], cost: 0, dirId: undefined}]
  let cur = stack[0]
  let seen = {}
  let paths = [];
  let minCost = Infinity;

  while (cur = stack.shift()) {
    if (cur.dirId !== undefined) cur.path.push(DIRS_LIT[cur.dirId]);
    if (map[cur.p[1]][cur.p[0]] === endVal) {
      if (cur.cost < minCost) {
        paths = []
        minCost = cur.cost
      }
      if (cur.cost == minCost) paths.push(cur.path)
      continue
    }

    let k = cur.p.join('_');
    if (seen[k] < cur.cost) continue;
    seen[k] = cur.cost;
    if (cur.cost > minCost) continue;

    DIRS.forEach((d, dirId) => {
      let p = [cur.p[0]+d[0], cur.p[1]+d[1]];
      if (map[p[1]][p[0]] == '#') return true;
      stack.push({
        path: cur.path.slice(),
        p: p,
        dirId: dirId,
        cost: cur.cost + 1
      })
    })
  }

  return paths.map(p => p.join('')+'A');
}

const getShortestSequence = (map: string[][], line: string, robots: number, memo = {}) => {
  let k = line + '_' + robots
  if (memo[k] !== undefined) {
    return memo[k]
  }

  let curPos = 'A'
  let length = 0

  line.split('').forEach(nextPos => {
    let paths: string[] = findShortestPath(map, curPos, nextPos)
    if (robots == 0) {
      length += paths[0].length
    } else {
      length += Math.min(...paths.map(path => getShortestSequence(dirpad, path, robots-1, memo)))
    }
    curPos = nextPos
  })

  memo[k] = length;
  return length;
}

const parseInput = (rawInput: string) => rawInput.trim().split('\n')

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let answer = 0

  input.forEach(line => {
    const number = parseInt(line)
    const shortestSequence = getShortestSequence(numpad, line, 2)
    answer += number * shortestSequence
  })

  return answer
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let answer = 0


  input.forEach(line => {
    const number = parseInt(line)
    const shortestSequence = getShortestSequence(numpad, line, 25)
    answer += number * shortestSequence
  })

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `029A
980A
179A
456A
379A`,
        expected: 126384,
      },
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
  onlyTests: true,
})
