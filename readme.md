# rollup-plugin-dustjs

> A rollup plugin for importing dustjs templates as modules

## Install

```bash
yarn add --dev rollup-plugin-dustjs

# npm works too
npm install --save-dev rollup-plugin-dustjs
```

**rollup.config.js**

```javascript
import dustjs from 'rollup-plugin-dustjs'

export default {
  // ...
  plugins: [
    dustjs()
  ]
}
```

### Options

#### whitespace

Default: `false`

Type: `Boolean`

## Use

### Import

```javascript
import main from './main.dust'
import { render } from 'dustjs-linkedin'

render(main, {}, (error, output) => {
  // ...
})
```

### Partials

**main.dust**

```
<div class="box">
  {>"./heading.dust"/}
  <p>...</p>
</div>
```

**heading.dust**

```
<h1>My heading</h1>
```
