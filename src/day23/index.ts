import run from "aocrunner"

const parseInput = (rawInput: string): [Set<string>, string[]] => {
  const lines = rawInput.split('\n')
  const uniqueComputers = new Set<string>()
  lines.forEach(connection => {
    const [computer1, computer2] = connection.split('-')
    uniqueComputers.add(computer1)
    uniqueComputers.add(computer2)
  })

  return [uniqueComputers, lines]
}

const getCorrectConnectionSize = (connections: Set<string>, correctStart: string): number => {
  return Array.from(connections).filter(connection => connection.split(',').some(item => item.startsWith(correctStart))).length
}

const getConnectedComputers = (computer: string, connections: string[]): string[] => {
  const connectionsForComputer = connections.filter(connection => connection.includes(computer))
  return connectionsForComputer.map(connection => {
    const [computer1, computer2] = connection.split('-')
    return computer1 === computer ? computer2 : computer1
  })
}

const part1 = (rawInput: string) => {
  const [uniqueComputers, connections ] = parseInput(rawInput)
  const correctConnections: Set<string> = new Set()

  console.log(uniqueComputers)

  for (const computer of uniqueComputers) {
    const secondConnections = getConnectedComputers(computer, connections)

    for (const secondConnection of secondConnections) {
      const connectionsOfSecondComputer = getConnectedComputers(secondConnection, connections)
      const thirdConnections = secondConnections.filter(conn => connectionsOfSecondComputer.includes(conn))

      if (thirdConnections.length > 0) {
        thirdConnections.forEach(thirdConnection => {
          const sortedConnections = [computer, secondConnection, thirdConnection].sort()

          if (!correctConnections.has(`${sortedConnections}`)) {
            correctConnections.add(`${sortedConnections}`)
          }
        })
      }
    }
  }

  return getCorrectConnectionSize(correctConnections, 't')
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
        input: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`,
        expected: 7,
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
