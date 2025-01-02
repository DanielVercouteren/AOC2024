import run from "aocrunner"

const getValue = (item: string[][]) => {
  const rotatedItem = item[0].map((_, idx) => item.map(row => row[idx]).reverse())

  let values: number[] = []

  for (let i = 0; i < rotatedItem.length; i++) {
    const length = rotatedItem[i].filter(cell => cell === '#').length - 1
    values.push(length)
  }

  return values
}

const parseInput = (rawInput: string): [number[][], number[][]] => {
  const keyOrLock = rawInput.split("\n\n")
  let keys: number[][] = []
  let locks: number[][] = []

  keyOrLock.forEach((item) => {
    item.split('\n')[0] === '#####'
      ? locks.push(getValue(item.split('\n').map(row => row.split(''))))
      : keys.push(getValue(item.split('\n').map(row => row.split(''))))
  })

  return [keys, locks]
}

const fitKeyInLock = (key: number[], lock: number[]) => {
  let fits = true
  for (let i = 0; i < key.length; i++) {
    if (key[i] + lock[i] > 5) {
      console.log(key[i], lock[i])
      fits = false
    }
  }

  return fits
}

const part1 = (rawInput: string) => {
  const [keys, locks] = parseInput(rawInput)
  let answer = 0

  locks.forEach(lock => {
    keys.forEach(key => {
      if(fitKeyInLock(key, lock)) { answer++ }
    })
  })

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
        input: `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`,
        expected: 3,
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
  onlyTests: false,
})
