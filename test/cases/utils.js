import { render as dustRender } from 'dustjs-linkedin'

/**
 * Synchronous dust render
 */
export function render (template, data = {}) {
  let result

  dustRender(template, data, (error, output) => {
    if (error) {
      throw error
    } else {
      result = output
    }
  })

  return result
}
