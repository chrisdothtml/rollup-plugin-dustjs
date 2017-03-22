import template from './index.dust'
import { render } from '../utils.js'

export default {
  expected: '<span>one</span>\n\n<span>two</span>\n',
  actual: render(template)
}
