import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.trim().split("\n")

const testReport = (levels: number[], withDampener: boolean) => {
  let isSafe: boolean = true
  const isAscending = levels[0] < levels[1]

  levels.forEach((level, i) => {
    if (i === levels.length - 1) return

    if (
      Math.abs(levels[i] - levels[i + 1]) > 3 ||
      levels[i] === levels[i + 1]
    ) {
      isSafe = false
    }

    if (isAscending && level > levels[i + 1]) {
      isSafe = false
    }

    if (!isAscending && level < levels[i + 1]) {
      isSafe = false
    }
  })

  if (withDampener) {
    for (let i = 0; i < levels.length; i++) {
      const copy = [...levels]
      delete copy[i]
      if (testReport(copy.filter(Number), false)) {
        return true
      }
    }
  }

  return isSafe
}

const part1 = (rawInput: string) => {
  const reports = parseInput(rawInput)
  let safeReports: number = 0

  reports.forEach((report) => {
    const levels = report.split(" ").map(Number)
    testReport(levels, false) && safeReports++
  })

  return safeReports
}

const part2 = (rawInput: string) => {
  const reports = parseInput(rawInput)
  let safeReports: number = 0

  reports.forEach((report) => {
    const levels = report.split(" ").map(Number)
    testReport(levels, true) && safeReports++
  })

  return safeReports
}

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
