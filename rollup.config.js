import uglify             from 'rollup-plugin-uglify'; // eslint-disable-line
import babel              from 'rollup-plugin-babel';
import replace            from 'rollup-plugin-replace';
import eslint             from 'rollup-plugin-eslint';
import conditional        from 'rollup-plugin-conditional';
import filesize           from 'rollup-plugin-filesize';
import resolve            from 'rollup-plugin-node-resolve';
import commonjs           from 'rollup-plugin-commonjs';
import visualizer         from 'rollup-plugin-visualizer';
import chalk              from 'chalk';
import skipCommentsCustom from './utils/uglify-skip-comments';

const pkg = require('./package.json');

const env      = process.env.NODE_ENV || 'development';
const isProd   = env === 'production';
const entry    = process.env.ENTRY || 'trae';
// eslint-disable-next-line no-confusing-arrow
const dest     = e => isProd ? `dist/${e}.min.js` : `dist/${e}.js`;
const banner   = `/**
 * Trae, the fetch library!
 *
 * @version: ${pkg.version}
 * @authors: ${pkg.author} | ${pkg.contributors[0]}
 */`;

console.log(chalk.red(`Building trae ${isProd ? 'for production ' : ''}`));
console.log(` - ${chalk.bold('Entry')}: ${chalk.green(entry)}.js`);
console.log(` - ${chalk.bold('Dest')}:  ${dest(chalk.green(entry))}\n`);

export default {
  entry     : `lib/${entry}.js`,
  dest      : dest(entry),
  format    : 'umd',
  moduleId  : 'trae',
  moduleName: 'trae',
  sourceMap : !isProd && 'inline',
  context   : 'global',
  banner,
  plugins: [
    eslint(),
    resolve({
      jsnext : true,
      main   : true,
      browser: true
    }),
    commonjs({
      namedExports: {
        'node_modules/qs/lib/index.js': ['stringify']
      }
    }),
    babel({
      babelrc: false, // jest makes use of .babelrc
      presets: ['es2015-rollup']
    }),
    replace({
      exclude               : 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(env),
      NODE_ENV              : JSON.stringify(env)
    }),
    conditional(
      isProd, [
        uglify({ output: { comments: skipCommentsCustom } })
      ]
    ),
    visualizer({ filename: './coverage/bundle-statistics.html' }),
    filesize()
  ]
};
