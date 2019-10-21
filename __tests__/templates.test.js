const generateMIT = require('../src/templates/mit').default
const generateISC = require('../src/templates/isc').default
const generateGPL = require('../src/templates/gpl').default
const generateMPL = require('../src/templates/mpl').default
const generateAPL = require('../src/templates/apl').default

describe('Templates', () => {
  test('MIT', () => {
    const name = 'William'
    const year = 2023
    const license = generateMIT(name, year)

    expect(license).toContain(name)
    expect(license).toContain(year)
  })

  test('ISC', () => {
    expect(generateISC()).toBeTruthy()
  })

  test('GPL', () => {
    const desc = 'Cool project'
    const name = 'William'
    const year = 2023
    const license = generateGPL(desc, name, year)

    expect(license).toContain(desc)
    expect(license).toContain(name)
    expect(license).toContain(year)
  })

  test('MPL', () => {
    expect(generateMPL()).toBeTruthy()
  })

  test('APL', () => {
    const name = 'William'
    const year = 2023
    const license = generateAPL(name, year)

    expect(license).toContain(name)
    expect(license).toContain(year)
  })
})
