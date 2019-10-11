import generateMIT from './mit'
import generateISC from './isc'

export default ({license, name, year}) => {
  switch (license) {
    case 'MIT':
      return generateMIT(name, year)
    case 'ISC':
      return generateISC()
    default:
      break
  }
}
