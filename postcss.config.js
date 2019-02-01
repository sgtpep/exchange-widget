module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    'postcss-import': {},
    'postcss-prefix-selector': {
      exclude: [/^(:root|body|html|\.App)($|[^\w-])/],
      prefix: '.App',
    },
    autoprefixer: {},
  },
});
