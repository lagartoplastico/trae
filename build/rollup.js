const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const eslint = require('rollup-plugin-eslint')
const conditional = require('rollup-plugin-conditional')
const filesize = require('rollup-plugin-filesize')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const visualizer = require('rollup-plugin-visualizer')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')
const json = require('rollup-plugin-json')
const mkdirp = require('mkdirp')

const skipCommentsCustom = require('./uglify-skip-comments')
const generateBanner = require('./generate-banner')
const generateBundleName = require('./generate-bundle-name')
const pkg = require('../package.json')

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

mkdirp('./dist')
mkdirp('./stats')

const inputOptions = (input, format) => ({
  input,
  plugins: [
    json({
      include: 'package.json',
      preferConst: true,
    }),
    eslint({
      exclude: 'package.json',
    }),
    conditional(format === 'cjs', [globals(), builtins()]),
    resolve({
      jsnext: format === 'umd',
      main: true,
      browser: format === 'umd',
      preferBuiltins: true,
    }),
    commonjs(),
    babel({
      babelrc: false, // jest makes use of .babelrc
      presets: [['@babel/preset-env', { modules: false }]],
      exclude: ['node_modules/**', 'package.json'],
    }),
    replace({
      exclude: ['node_modules/**', 'package.json'],
      values: {
        'process.env.NODE_ENV': JSON.stringify(env),
        NODE_ENV: JSON.stringify(env),
      },
    }),
    visualizer({ filename: `./stats/${format}-bundle-statistics.html` }),
    conditional(isProd && format === 'umd', [
      uglify({ output: { comments: skipCommentsCustom } }),
    ]),
    filesize(),
  ],
})

const outputOptions = (file, format) => ({
  format,
  dir: 'dist',
  file: generateBundleName(file, format),
  // The variable name, represents the umd bundle by which other scripts on the same
  // page can access it
  name: format === 'umd' ? pkg.name : undefined,
  sourcemapFile: 'dist',
  banner: generateBanner(pkg.version, pkg.contributors),
})

const build = ({ input, output }) =>
  rollup.rollup(input).then((bundle) => bundle.write(output))

let bundles = Promise.resolve()
;['cjs', 'umd'].forEach((format) => {
  bundles = build({
    input: inputOptions('lib/index.js', format),
    output: outputOptions('lib/index.js', format),
  })
})

bundles.catch((err) => console.error(err.stack))
