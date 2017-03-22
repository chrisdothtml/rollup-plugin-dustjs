import md5 from 'md5'
import dust, { compile } from 'dustjs-linkedin'
import { basename, dirname, extname, resolve } from 'path'

const { floor, random } = Math
const token = floor(random() * 10000000)

function getFullPath (from, to) {
  return resolve(dirname(from), to)
}

function generateName (path) {
  const name = basename(path, '.dust')
  const hash = md5(token + path)

  return `${name}-${hash}`
}

function resolvePartials (source, parentPath) {
  const partials = []
  const partialRegex = /\{>\s*"([^"]+)"[^\n]*\/\}/g
  const newSource = source.replace(partialRegex, (tag, relPath) => {
    if (extname(relPath) === '.dust') {
      const fullPath = getFullPath(parentPath, relPath)
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
