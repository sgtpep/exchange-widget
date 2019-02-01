export default {
  output: [
    {
      file: './dist/exchange-widget.esm.min.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: './dist/exchange-widget.min.js',
      format: 'iife',
      sourcemap: true,
    },
    {
      file: './dist/exchange-widget.umd.min.js',
      format: 'umd',
      name: 'exchange-widget',
      sourcemap: true,
    },
  ],
  input: './src/index.js',
};
