import arg from 'arg'
import inquirer from 'inquirer'
import createLicense from './index'

const parseArgsToOptions = rawArgs => {
  const args = arg(
    {
      '--mit': Boolean,
      '--isc': Boolean,
      '--gpl': Boolean,
    },
    {
      argv: rawArgs.slice(1),
    },
  )
  return {
    isMIT: args['--mit'] || false,
    isISC: args['--isc'] || false,
    isGPL: args['--gpl'] || false,
  }
}

const promptForOptions = async options => {
  let selectedLicense
  if (!options.isMIT && !options.isISC) {
    selectedLicense = await inquirer.prompt([
      {
        type: 'list',
        name: 'license',
        message: 'License:',
        choices: ['MIT', 'ISC', 'GPL'],
      },
    ])
  } else {
    if (options.isMIT) {
      selectedLicense = {license: 'MIT'}
    } else if (options.isISC) {
      selectedLicense = {license: 'ISC'}
    } else if (options.isGPL) {
      selectedLicense = {license: 'GPL'}
    }
  }

  const questions = []

  if (
    (selectedLicense && selectedLicense.license === 'MIT') ||
    options.isMIT ||
    (selectedLicense && selectedLicense.license === 'GPL') ||
    options.isGPL
  ) {
    questions.push(
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
    )
  }

  if (
    (selectedLicense && selectedLicense.license === 'GPL') ||
    options.isGPL
  ) {
    questions.push(
      {
        type: 'input',
        name: 'title',
        message: 'Project title:',
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Project description:',
      },
    )
  }

  const answers = await inquirer.prompt(questions)

  return {...answers, ...selectedLicense}
}

export const cli = async args => {
  const options = await promptForOptions(parseArgsToOptions(args))
  await createLicense(options)
}
