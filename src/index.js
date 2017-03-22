import { compile } from 'dustjs-linkedin'
import { extname } from 'path'

export default function dustjs () {
  return {
    name: 'dustjs',
    transform (source, path) {
      if (extname(path) === '.dust') {
        const template = compile(source)

        return `
        import dust from 'dustjs-linkedin'
        export default ${template}
        `
      }
    }
  }
}
