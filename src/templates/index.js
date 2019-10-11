import generateMIT from './mit'
import generateISC from './isc'
import generateGPL from './gpl'

export default ({license, desc, name, year}) => {
  switch (license) {
    case 'MIT':
      return generateMIT(name, year)
    case 'ISC':
      return generateISC()
    case 'GPL':
      return generateGPL(desc, name, year)
    default:
      break
  }
}
