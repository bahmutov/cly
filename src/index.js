#!/usr/bin/env node

'use strict'

const shell = require('shelljs')
const debug = require('debug')('@bahmutov/cly')
const path = require('path')

const initCommand = args => {
  debug('command arguments %o', args)

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

  if (!args.cypressVersion) {
    throw new Error('Unknown Cypress version to scaffold')
  }

  const DEFAULT_SCAFFOLD_VERSION = '4'
  let scaffoldedVersion = args.cypressVersion

  if (scaffoldedVersion.indexOf('.')) {
    scaffoldedVersion = scaffoldedVersion.split('.')[0]
    debug('extracted major version %s', scaffoldedVersion)
  }

  let sourceFolder = path.join(__dirname, '..', scaffoldedVersion)

  if (args.typescript) {
    debug('scaffolding TypeScript specs')
    sourceFolder += 'ts'
  }

  if (!shell.test('-d', sourceFolder)) {
    console.error(
      'WARNING: do not have scaffold for Cypress version %s',
      scaffoldedVersion
    )
    console.error('Will scaffold for version %s', DEFAULT_SCAFFOLD_VERSION)
    scaffoldedVersion = DEFAULT_SCAFFOLD_VERSION
    sourceFolder = path.join(__dirname, '..', scaffoldedVersion)
  }

  shell.cp(path.join(sourceFolder, 'cypress.json'), process.cwd())
  shell.cp('-r', path.join(sourceFolder, 'cypress'), process.cwd())
  debug('done copying files from %s', sourceFolder)

  console.log(
    '✅ scaffolded "cypress" folder with a single example spec (v%s)',
    scaffoldedVersion
  )
  console.log('you can configure additional options in cypress.json file')
  console.log('see https://on.cypress.io/configuration')
}

// eslint-disable-next-line no-unused-expressions
require('yargs')
  .command({
    command: 'init',
    aliases: 'scaffold',
    desc: 'scaffold Cypress tests',
    builder: {
      cypressVersion: {
        default: '4',
        alias: 'cv',
        desc: 'for Cypress version',
        type: 'string'
      },
      typescript: {
        default: false,
        alias: 't',
        desc: 'scaffold using TypeScript',
        type: 'boolean'
      }
    },
    handler: initCommand
  })
  .demandCommand()
  .help()
  .wrap(72).argv
