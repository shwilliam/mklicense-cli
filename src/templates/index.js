import generateMIT from './mit'
import generateISC from './isc'
import generateGPL from './gpl'
import generateMPL from './mpl'
import generateAPL from './apl'

export default ({license, desc, name, year}) => {
  switch (license) {
    case 'MIT':
      return generateMIT(name, year)
    case 'ISC':
      return generateISC()
    case 'GPL':
      return generateGPL(desc, name, year)
    case 'MPL':
      return generateMPL()
    case 'APL':
      return generateAPL(name, year)
    default:
      break
  }
}
