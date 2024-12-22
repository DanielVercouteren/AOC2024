import run from "aocrunner"

const mix = (number: bigint, seed: bigint) => number ^ seed

const prune = (number: bigint) => number % 16777216n

const calculateRandomNumber = (seed: bigint): bigint => {
  seed = prune(mix(seed << 6n, seed))
  seed = prune(mix(seed >> 5n, seed))
  seed = prune(mix(seed << 11n, seed))

  return seed
}

const parseInput = (rawInput: string) => rawInput.split('\n').map(BigInt)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let seed = 0n

  input.forEach(number => {
    let currentSeed = number
    for (let i = 0; i < 2000; i++) {
      currentSeed = calculateRandomNumber(currentSeed)
    }
    seed += currentSeed
  })

  return seed
}

const sequenceMap = (array: number[]): Map<string, number> => {
  const map: Map<string, number> = new Map()

  for(let i = 0; i <= array.length - 4; i++) {
    const key = array.slice(i, i + 4).join(',')
    if (!map.has(key)) {
      map.set(key, i)
    }
  }

  return map
}

const getHighestBananas = (totalBananas: Map<string, number>) => {
  return Array.from(totalBananas.values()).reduce((max, current) => Math.max(max, current), -Infinity)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let prices: number[][] = Array(input.length).fill(null).map(() => []);
  let priceDifferences: number[][] = Array(input.length).fill(null).map(() => []);
  let totalBananas: Map<string, number> = new Map()
  const sequenceMaps: Array<Map<string, number>> = []

  input.forEach((number, idx) => {
    let currentSeed = number
    prices[idx].push(Number(number % 10n))
    for (let i = 0; i < 2000; i++) {
      currentSeed = calculateRandomNumber(currentSeed)
      prices[idx].push(Number(currentSeed % 10n))
      priceDifferences[idx].push(Number(prices[idx][i + 1] - prices[idx][i]))
    }

    sequenceMaps.push(sequenceMap(priceDifferences[idx]))
  })

  let percentage = 0

  const min = priceDifferences.map(differences => differences.reduce((acc, curr) => Math.min(acc, curr), Infinity))[0]
  const max = priceDifferences.map(differences => differences.reduce((acc, curr) => Math.max(acc, curr), -Infinity))[0]

  const possibilities = (max - min + 1) ** 4
  let x = 0

  console.log('Calculating possibilities...')
  console.log(sequenceMaps.length)

  for(let a = min; a <= max; a++) {
    for(let b = min; b <= max; b++) {
      for(let c = min; c <= max; c++) {
        for (let d = min; d <= max; d++) {
          x++
          const key = `${a},${b},${c},${d}`
          totalBananas.set(key, 0)

          for(let i = 0; i < sequenceMaps.length; i++) {
            const index = sequenceMaps[i].get(key)
            if (index !== undefined) {
              const bananas = prices[i][index + 4]
              totalBananas.set(key, totalBananas.get(key) + bananas)
            }
          }

          const perc = Math.floor((x / possibilities) * 100)
          if (perc !== percentage) {
            percentage = perc
            console.log(`${percentage}%`)
          }
        }
      }
    }
  }

  const bananas = getHighestBananas(totalBananas)
  console.log(bananas)
  return bananas
}

run({
  part1: {
    tests: [
      {
        input: `1
10
100
2024`,
        expected: 37327623n,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1
2
3
2024`,
        expected: 23,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
