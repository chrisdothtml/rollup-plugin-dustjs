import dust, { compile } from 'dustjs-linkedin'
import { dirname, extname, resolve } from 'path'
import { generateName, hash } from './utils.js'

/**
 * Finds all valid partials and replaces paths with respective
 * unique template names
 */
function resolvePartials (source, parentPath) {
  const partials = []
  // matches {>"./file.dust" /}
  const partialRegex = /\{>\s*"([^"]+)"[^\n]*\/\}/g
  const newSource = source.replace(partialRegex, (tag, relPath) => {
    if (extname(relPath) === '.dust') {
      const fullPath = resolve(dirname(parentPath), relPath)
      const name = generateName(fullPath)

      partials.push(relPath)
      return tag.replace(relPath, name)
    } else {
      return tag
    }
  })

  return {
    newSource,
    partials
  }
}

export default function dustjs (options = {}) {
  if (options.whitespace === true) {
    dust.config.whitespace = true
  }

  return {
    name: 'dustjs',
    transform (source, path) {
      if (extname(path) === '.dust') {
        const { newSource, partials } = resolvePartials(source, path)
        const name = generateName(path)
        const template = compile(newSource, name)
        let compiled = `import dust from 'dustjs-linkedin'\n`

        partials.forEach(relPath => {
          compiled += `import '${relPath}'\n`
        })

        compiled += `export default ${template}`
        return compiled
      }
    }
  }
}
