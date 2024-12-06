import run from "aocrunner"

const parseInput = (rawInput: string): [string[], string[]] => {
  const [pageOrderingRules, pageNumberUpdates] = rawInput.split('\n\n')
  return [pageOrderingRules.split('\n'), pageNumberUpdates.split('\n')]
}

const part1 = (rawInput: string) => {
  const [pageOrderingRules, pageNumberUpdates] = parseInput(rawInput)
  let answer: number = 0

  pageNumberUpdates.forEach(update => {
    let correctlyExecuted = true
    const pageNumbers = update.split(',')

    for(let i = 0; i < pageNumbers.length; i++) {
      pageOrderingRules.filter(orderingRule => orderingRule.includes(pageNumbers[i])).forEach(rule => {
        const [page1, page2] = rule.split('|')
        const page1Index = pageNumbers.indexOf(page1)
        const page2Index = pageNumbers.indexOf(page2)

        if (pageNumbers[i] === page1 && page2Index !== -1 && i > page2Index) {
          correctlyExecuted = false
        }

        if (pageNumbers[i] === page2 && page1Index !== -1 && i < page1Index) {
          correctlyExecuted = false
        }
      })
    }

    if (correctlyExecuted) {
      answer += Number(pageNumbers[Math.floor(pageNumbers.length / 2)])
    }

  })

  return answer
}

const part2 = (rawInput: string) => {
  const [pageOrderingRules, pageNumberUpdates] = parseInput(rawInput)
  let answer: number = 0

  const fixUpdate = (pageNumbers: string[], brokenRules: string[]): string[] => {
    let fixedPageUpdate = [...pageNumbers]
    brokenRules.forEach(brokenRule => {
      const [left, right] = brokenRule.split('|')
      const leftIndex = fixedPageUpdate.indexOf(left)
      const rightIndex = fixedPageUpdate.indexOf(right)

      if (leftIndex > rightIndex) {
        fixedPageUpdate.splice(leftIndex, 1)
        fixedPageUpdate.splice(rightIndex, 0, left)
      }
    })

    return fixedPageUpdate
  }

  const getBrokenRules = (pageNumbers: string[]): string[] => {
    let brokenRules: string[] = []
    for(let i = 0; i < pageNumbers.length; i++) {
      pageOrderingRules.filter(orderingRule => orderingRule.includes(pageNumbers[i])).forEach(rule => {
        const [page1, page2] = rule.split('|')
        const page1Index = pageNumbers.indexOf(page1)
        const page2Index = pageNumbers.indexOf(page2)

        if (pageNumbers[i] === page1 && page2Index !== -1) {
          if(i > page2Index && !brokenRules.includes(rule)) {
            brokenRules.push(rule)
          }
        }

        if (pageNumbers[i] === page2 && page1Index !== -1) {
          if(i < page1Index && !brokenRules.includes(rule)) {
            brokenRules.push(rule)
          }
        }
      })
    }

    return brokenRules
  }

  pageNumberUpdates.forEach(update => {
    let pageNumbers = update.split(',')
    let brokenRules = getBrokenRules(pageNumbers)

    if (brokenRules.length > 0) {
      while(brokenRules.length > 0) {
        pageNumbers = fixUpdate(pageNumbers, brokenRules)
        brokenRules = getBrokenRules(pageNumbers)
      }

      answer += Number(pageNumbers[Math.floor(pageNumbers.length / 2)])
    }
  })



  return answer
}

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
