import { basename } from 'path'

const { abs, floor, random } = Math
const token = floor(random() * 10000000)

/*
 * http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hash (input) {
  let hash = 0

  if (input.length) {
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)

      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
  }

  return abs(hash)
}

/**
 * Generates unique template name for the provided path
 */
export function generateName (path) {
  const name = basename(path, '.dust')
  const pathHash = hash(token + path)

  return `${name}-${pathHash}`
}
