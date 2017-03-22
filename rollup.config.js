export default {
  entry: 'src/index.js',
  dest: 'build/index.js',
  format: 'cjs',
  external: [
    'dustjs-linkedin',
    'path'
  ]
}
