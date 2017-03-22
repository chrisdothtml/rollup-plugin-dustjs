export default {
  entry: 'src/index.js',
  dest: 'build/index.js',
  format: 'cjs',
  external: [
    'dustjs-linkedin',
    'md5',
    'path'
  ]
}
