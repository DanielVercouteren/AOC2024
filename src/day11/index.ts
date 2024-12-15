import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(' ').map(Number)

const splitStones = (stones: number[]): number[] => {
  let newStones: number[] = []
  stones.forEach((stone) => {
    const stoneLength = `${stone}`.split('').length
    if (stone === 0) {
      newStones.push(1)
    } else if (stoneLength % 2 === 0) {
      const leftHalf = Number(`${stone}`.split('').slice(0, stoneLength / 2).join(''))
      const rightHalf = Number(`${stone}`.split('').slice(stoneLength / 2).join(''))
      newStones.push(leftHalf)
      newStones.push(rightHalf)
    } else {
      newStones.push(stone * 2024)
    }
  })

  return newStones
}


const part1 = (rawInput: string) => {
  let stones = parseInput(rawInput)

  for (let i = 0; i < 25; i++) {
    stones = splitStones(stones)
  }

  return stones.length
}

const part2 = (rawInput: string) => {
  let stones = parseInput(rawInput)

  const cache = {}
  const getStoneBlinkResult = (stone, blinks) => {
    if (cache[stone]) {
      return cache[stone][blinks]
    }
  }
  const setCache = (stone, blinks, result) => {
    if (!cache[stone]) {
      cache[stone] = { [blinks]: result }
    }

    cache[stone][blinks] = result
  }

  const getStoneCount = (stone: number, blinks: number) => {
    if (blinks === 0) {
      return 1
    }

    if (getStoneBlinkResult(stone, blinks)) {
      return getStoneBlinkResult(stone, blinks)
    }

    let result: number
    const stoneLength = `${stone}`.split('').length
    if (stone === 0) {
      result = getStoneCount(1, blinks - 1)
    } else if (stoneLength % 2 === 0) {
      result = getStoneCount(Number(`${stone}`.slice(0, `${stone}`.length / 2)), blinks - 1)
        + getStoneCount(Number(`${stone}`.slice(`${stone}`.length / 2)), blinks - 1)
    } else {
      result = getStoneCount(stone * 2024, blinks - 1)
    }

    setCache(stone, blinks, result)
    return result;
  }

  return stones.map(x => getStoneCount(x, 75)).reduce((acc, curr) => acc += curr, 0)
}

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
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
