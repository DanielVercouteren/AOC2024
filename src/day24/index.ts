import run from "aocrunner"

const parseInput = (rawInput: string): [Map<string, number>, string[]] => {
  const [bits, operations] = rawInput.split("\n\n")
  let map: Map<string, number> = new Map()

  bits.split('\n').forEach(bit => {
    const [key, value] = bit.split(': ')
    map.set(key, parseInt(value))
  })

  return [map, operations.split('\n')]
}

const bitsToNumber = (bits: Map<string, number>): number => {
  const bitDigit = Array.from(bits.entries())
    .filter(([key]) => key.startsWith('z'))
    .sort(([keyA], [keyB]) => keyB.localeCompare(keyA))
    .map(bit => bit[1])
    .join('')

  return parseInt(bitDigit, 2)
}

const part1 = (rawInput: string) => {
  let [bits, operations] = parseInput(rawInput)
  const operationRegex = /(\w+) (\w+) (\w+) -> (\w+)/
  let hasAllBits = false

  while(!hasAllBits) {
    hasAllBits = true
    operations.forEach(operation => {
      const [,left, gate, right, output] = operation.match(operationRegex)
      if (bits.has(output)) {
        return
      }

      hasAllBits = false

      if(!bits.has(left) || !bits.has(right)) {
        return
      }

      switch (gate) {
        case 'AND':
          bits.set(output, bits.get(left) && bits.get(right) ? 1 : 0)
          break
        case 'OR':
          bits.set(output, bits.get(left) || bits.get(right) ? 1 : 0)
          break
        case 'XOR':
          bits.set(output, bits.get(left) != bits.get(right) ? 1 : 0)
          break
        default:
          break
      }
    })
  }

  return bitsToNumber(bits)
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
        input: `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`,
        expected: 4,
      },
      {
        input: `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`,
        expected: 2024
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
