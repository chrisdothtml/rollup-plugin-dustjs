/* eslint-env mocha */

const dustjs = require('../build/index.js')
const { expect } = require('chai')
const { rollup } = require('rollup')
const { join } = require('path')

/**
 * Runs provided source code as a node module
 */
function runAsModule (source) {
  const run = new Function('module', 'exports', 'require', source) // eslint-disable-line no-new-func
  const module = {
    exports: {}
  }

  run(module, module.exports, require)
  return module.exports
}

function runTestCase (name, options = {}) {
  const config = {
    compile: {
      entry: join(__dirname, `cases/${name}/index.js`),
      external: ['dustjs-linkedin'],
      plugins: [dustjs(options)]
    },
    generate: {
      format: 'cjs'
    }
  }

  return rollup(config.compile)
    .then(function (bundle) {
      const { code } = bundle.generate(config.generate)
      const { actual, expected } = runAsModule(code)

      expect(actual).to.equal(expected)
    })
}

describe('dustjs plugin', () => {
  it(
    'should compile templates when imported',
    () => runTestCase('simple')
  )

  it(
    'should dynamically import partials',
    () => runTestCase('partials')
  )

  it(
    'should preserve whitespace when the option is passed',
    () => runTestCase('whitespace', { whitespace: true })
  )
})
