import babel from 'rollup-plugin-babel';
import commonJS from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/exchange-widget.es.min.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: './dist/exchange-widget.min.js',
      format: 'iife',
      name: 'exchangeWidget',
      sourcemap: true,
    },
    {
      file: './dist/exchange-widget.umd.min.js',
      format: 'umd',
      name: 'exchange-widget',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      ignore: ['./node_modules'],
      presets: [['@babel/env', { useBuiltIns: 'usage' }]],
    }),
    commonJS(),
    nodeResolve(),
  ],
};
