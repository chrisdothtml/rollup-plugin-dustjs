import template from './index.dust'
import { render } from '../utils.js'

export default {
  expected: '<span>Chris</span>',
  actual: render(template, {
    name: 'Chris'
  })
}
