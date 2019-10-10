import chalk from 'chalk'
import fs from 'fs'
import generateLicenseContent from './templates'

const makeFile = async (filename, content) =>
  fs.writeFile(`./${filename}`, content, e => e && console.error(e))

export default async opts => {
  await makeFile(
    'LICENSE',
    generateLicenseContent({
      ...opts,
      targetDir: process.cwd(),
    }),
  )

  console.log(chalk.green.bold('DONE'))

  return 1
}
