import arg from 'arg'
import inquirer from 'inquirer'
import createLicense from './index'

const parseArgsToOptions = rawArgs => {
  const args = arg(
    {
      '--mit': Boolean,
    },
    {
      argv: rawArgs.slice(1),
    },
  )
  return {
    isMIT: args['--mit'] || false,
  }
}

const promptForOptions = async options => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Name:',
    },
    {
      type: 'input',
      name: 'year',
      message: 'Year:',
    },
  ]

  if (!options.isMIT)
    questions.unshift({
      type: 'list',
      name: 'license',
      message: 'License:',
      choices: ['MIT'],
    })

  const answers = await inquirer.prompt(questions)

  return answers
}

export const cli = async args => {
  const options = await promptForOptions(parseArgsToOptions(args))
  await createLicense(options)
}
