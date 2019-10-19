import arg from 'arg'
import inquirer from 'inquirer'
import createLicense from './index'

const parseArgsToOptions = rawArgs => {
  const args = arg(
    {
      '--mit': Boolean,
      '--isc': Boolean,
      '--gpl': Boolean,
      '--mpl': Boolean,
      '--apl': Boolean,
    },
    {
      argv: rawArgs.slice(1),
    },
  )
  return {
    isMIT: args['--mit'] || false,
    isISC: args['--isc'] || false,
    isGPL: args['--gpl'] || false,
    isMPL: args['--mpl'] || false,
    isAPL: args['--apl'] || false,
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
        choices: ['MIT', 'ISC', 'GPL', 'MPL', 'APL'],
      },
    ])
  } else {
    if (options.isMIT) {
      selectedLicense = {license: 'MIT'}
    } else if (options.isISC) {
      selectedLicense = {license: 'ISC'}
    } else if (options.isGPL) {
      selectedLicense = {license: 'GPL'}
    } else if (options.isMPL) {
      selectedLicense = {license: 'MPL'}
    } else if (options.isAPL) {
      selectedLicense = {license: 'APL'}
    }
  }

  const questions = []

  if (
    (selectedLicense && selectedLicense.license === 'MIT') ||
    options.isMIT ||
    (selectedLicense && selectedLicense.license === 'GPL') ||
    options.isGPL ||
    (selectedLicense && selectedLicense.license === 'APL') ||
    options.isAPL
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
