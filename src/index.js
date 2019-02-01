#!/usr/bin/env node

'use strict'

const shell = require('shelljs')
const debug = require('debug')('@bahmutov/cly')
const path = require('path')

const noOptions = () => {}

const initCommand = () => {
  console.log('scaffolding new Cypress project')
  debug('working directory %s', process.cwd())

  if (shell.test('-d', 'cypress')) {
    console.error('Found existing folder "cypress", cannot scaffold')
    process.exit(1)
  }
  if (shell.test('-f', 'cypress.json')) {
    console.error('Found existing file "cypress.json", cannot scaffold')
    process.exit(1)
  }

  // TODO find Cypress version from package.json
  const cypressVersion = '3'
  const sourceFolder = path.join(__dirname, '..', cypressVersion)

  shell.cp(path.join(sourceFolder, 'cypress.json'), process.cwd())
  shell.cp('-r', path.join(sourceFolder, 'cypress'), process.cwd())
  debug('done copying files from %s', sourceFolder)

  console.log('✅ scaffolded "cypress" folder with a single example spec')
  console.log('you can configure additional options in cypress.json file')
  console.log('see https://on.cypress.io/configuration')
}

// eslint-disable-next-line no-unused-expressions
require('yargs')
  .command(
    ['init', 'scaffold'],
    'scaffold Cypress tests',
    noOptions,
    initCommand
  )
  .demandCommand()
  .help()
  .wrap(72).argv
