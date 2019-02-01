import babel from 'rollup-plugin-babel';
import commonJS from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: './src/index.js',
  output: {
    file: './dist/exchange-widget.min.js',
    format: 'iife',
    name: 'exchangeWidget',
    sourcemap: true,
  },
  plugins: [
    babel({
      ignore: ['./node_modules'],
      plugins: ['babel-plugin-htm'],
      presets: [['@babel/env', { useBuiltIns: 'usage' }]],
    }),
    commonJS(),
    inject({
      h: ['preact', 'h'],
      include: './src/**/*.js',
    }),
    nodeResolve(),
    uglify(),
  ],
};
