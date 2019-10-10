import generateMIT from './mit'

export default ({license, name, year}) => {
  switch (license) {
    case 'MIT':
      return generateMIT(name, year)
    default:
      break
  }
}
