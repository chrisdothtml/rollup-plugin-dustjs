import template from './index.dust'
import { render } from '../utils.js'

export default {
  expected: '<div><h1>Heading</h1><p>Body</p></div>',
  actual: render(template)
}
