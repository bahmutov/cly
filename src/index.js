#!/usr/bin/env node

'use strict'

const noOptions = () => {}

const initCommand = () => {
  console.log('scaffolding new Cypress project')
}

// eslint-disable-next-line no-unused-expressions
require('yargs').command(
  ['init', '$0'],
  'scaffold Cypress tests',
  noOptions,
  initCommand
).argv
