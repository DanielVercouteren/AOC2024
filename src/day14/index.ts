import run from "aocrunner"

type Robot = {
  px: number
  py: number
  vx: number
  vy: number
}

type DangerLevel = {
  day: number,
  level: number
}

const parseInput = (rawInput: string): Robot[] => rawInput.split('\n').map((line) => {
  const [position, velocity] = line.split(' v=')
  const [px, py] = position.split('p=')[1].split(',').map(Number)
  const [vx, vy] = velocity.split(',').map(Number)
  return {
    px,
    py,
    vx,
    vy,
  }
})

const calculateRobotPositions = (robots: Robot[], spaceWidth: number, spaceDepth: number) => {
  for(const robot of robots) {
    robot.px += robot.vx
    robot.py += robot.vy

    if (robot.px < 0) {
      robot.px = spaceWidth + robot.px
    }

    if (robot.px >= spaceWidth) {
      robot.px = robot.px - spaceWidth
    }

    if (robot.py < 0) {
      robot.py = spaceDepth + robot.py
    }

    if (robot.py >= spaceDepth) {
      robot.py = robot.py - spaceDepth
    }
  }
}

const calculateQuadrant = (quadrants: Array<number>, px: number, py: number) => {
  const spaceWidth = 101
  const spaceDepth = 103

  if (px === Math.floor(spaceWidth / 2) || py === Math.floor(spaceDepth / 2)) {
    return
  }

  if (px < Math.floor(spaceWidth / 2) && py < Math.floor(spaceDepth / 2)) {
    quadrants[0]++
  }

  if (px > Math.floor(spaceWidth / 2) && py < Math.floor(spaceDepth / 2)) {
    quadrants[1]++
  }

  if (px < Math.floor(spaceWidth / 2) && py > Math.floor(spaceDepth / 2)) {
    quadrants[2]++
  }

  if (px > Math.floor(spaceWidth / 2) && py > Math.floor(spaceDepth / 2)) {
    quadrants[3]++
  }
}


const part1 = (rawInput: string) => {
  const robots: Robot[] = parseInput(rawInput)
  const spaceWidth = 101
  const spaceDepth = 103
  const maxSeconds = 100

  for(let i = 1; i <= maxSeconds; i++) {
    calculateRobotPositions(robots, spaceWidth, spaceDepth)
  }

  let quadrants = [0, 0, 0, 0]
  robots.forEach((robot) => {
    calculateQuadrant(quadrants,robot.px, robot.py)
  })

  return quadrants.reduce((acc, curr) => acc * curr, 1)
}

const part2 = (rawInput: string) => {
  const robots: Robot[] = parseInput(rawInput)
  const spaceWidth = 101
  const spaceDepth = 103
  const maxSeconds = 100000
  let lowestDanger: DangerLevel = { day: 0, level: Infinity }

  for(let i = 1; i <= maxSeconds; i++) {
    calculateRobotPositions(robots, spaceWidth, spaceDepth)

    let quadrants = [0, 0, 0, 0]
    robots.forEach((robot) => {
      calculateQuadrant(quadrants,robot.px, robot.py)
    })

    const dangerLevel = quadrants.reduce((acc, curr) => acc * curr, 1)

    if (dangerLevel < lowestDanger.level) {
      lowestDanger = { day: i, level: dangerLevel }
    }
  }

  return lowestDanger.day
}

run({
  part1: {
    tests: [
      {
        input: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
        expected: 12,
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
