import run from "aocrunner"

type Registers = {
  A: number,
  B: number,
  C: number,
}

const parseInput = (rawInput: string): [Registers, number[]] => {
  const [registerA, registerB, registerC, ...program] = rawInput.match(/\d+/g).map(Number)
  return [{ A: registerA, B: registerB, C: registerC }, program]
}

const adv = (op: number, registers: Registers) => registers.A = Math.floor(registers.A / 2 ** op)
const bxl = (op: number, registers: Registers) => registers.B ^= op
const bst = (op: number, registers: Registers) => registers.B = op % 8

const bxc = (registers: Registers) => registers.B ^= registers.C

const out = (op: number): number => op % 8

const bdv = (op: number, registers: Registers) => registers.B = Math.floor(registers.A / 2 ** op)

const cdv = (op: number, registers: Registers) => registers.C = Math.floor(registers.A / 2 ** op)

const part1 = (rawInput: string) => {
  let [registers, opcodes] = parseInput(rawInput)
  let pointer = 0
  const answer: number[] = []

  const getCombo = (literal: number): number => {
    switch(literal) {
      case 0:
      case 1:
      case 2:
      case 3:
        return literal
      case 4:
        return registers.A
      case 5:
        return registers.B
      case 6:
        return registers.C
    }
  }

  while(pointer < opcodes.length) {
    const literal = opcodes[pointer]
    const combo = getCombo(opcodes[pointer + 1])
    switch(literal) {
      case 0: {
        adv(combo, registers)
        pointer += 2
        break
      }
      case 1: {
        bxl(literal, registers)
        pointer += 2
        break
      }
      case 2: {
        bst(combo, registers)
        pointer += 2
        break
      }
      case 3: {
        if (registers.A !== 0) {
          pointer = combo
          continue
        }
        pointer += 2
        break
      }
      case 4: {
        bxc(registers)
        pointer += 2
        break
      }
      case 5: {
        answer.push(out(combo))
        pointer += 2
        break
      }
      case 6: {
        bdv(combo, registers)
        pointer += 2
        break
      }
      case 7: {
        cdv(combo, registers)
        pointer += 2
        break
      }
    }
  }

  return `${answer.join(',')}`
}

const part2 = (rawInput: string) => {
  let [registers, program] = parseInput(rawInput)
  const end = program.join('')
  let pointer = 0
  const getCombo = (literal: number): number => {
    switch(literal) {
      case 0:
      case 1:
      case 2:
      case 3:
        return literal
      case 4:
        return registers.A
      case 5:
        return registers.B
      case 6:
        return registers.C
    }
  }

  let res = 164540892147388
  let answer: number[] = []
  const tryValues = (x: number) => {
    registers.A = x
    registers.B = 0
    registers.C = 0
    pointer = 0
    program = [...program]
    answer = []

    while (pointer < program.length) {
      const literal = program[pointer]
      const combo = getCombo(program[pointer + 1])
      switch (literal) {
        case 0: {
          adv(combo, registers)
          pointer += 2
          break
        }
        case 1: {
          bxl(literal, registers)
          pointer += 2
          break
        }
        case 2: {
          bst(combo, registers)
          pointer += 2
          break
        }
        case 3: {
          if (registers.A !== 0) {
            pointer = combo
            continue
          }
          pointer += 2
          break
        }
        case 4: {
          bxc(registers)
          pointer += 2
          break
        }
        case 5: {
          answer.push(out(combo))
          pointer += 2
          break
        }
        case 6: {
          bdv(combo, registers)
          pointer += 2
          break
        }
        case 7: {
          cdv(combo, registers)
          pointer += 2
          break
        }
      }
    }

    return answer.join('')
  }

  while(true) {
    const v = tryValues(res)
    console.log(`res ${res} gives v ${v}, while looking for end ${end}`)

    if (v === end) {
      console.log(`v = ${v} for end ${end}`)
      break
    }
    res++
  }

  return res
}

run({
  part1: {
    tests: [
      {
        input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: 4635635210,
      },
      {
        input: `Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`,
        expected: 12,
      },
      {
        input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: 42567777310,
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
