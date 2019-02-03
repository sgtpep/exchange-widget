# Exchange Widget

[![Build Status](https://travis-ci.org/sgtpep/exchange-widget.svg?branch=master)](https://travis-ci.org/sgtpep/exchange-widget)

The currency exchange widget inspired by a popular mobile app. Demo: https://sgtpep.github.io/exchange-widget/dist/.

## Development

This project doesn't require bundlers like webpack for development and consists entirely of browser-native ES modules and stylesheets which can be served as static files by an HTTP server.

From a project directory run `npm install` and then `npm start` to start an HTTP server on `http://localhost:8000/`. Edit files and refresh the page in the browser to see the result.

## NPM Scripts

- `build`: Generates the production code by combining, transpiling and minimizing of styles and scripts.
- `check-format`: Checks if the code is formatted.
- `format`: Formats the code using `prettier`.
- `lint`: Checks the code for linting errors using `eslint`.
- `start`: Starts the development web server for serving static content on `http://localhost:8000/`.
- `start-test`: Starts `jest` in the watch mode.
- `test`: Runs tests in `jest`.

## Unconventional Decisions

- Whenever possible I prefer functional style in code (except for tests which look better being imperative): arrow (lambda) functions over functions, `.map()`/`.filter()`,`.reduce()`, etc. over `for .. of`, `const` over `let`, expressions over statements, etc. It may look unusual to untrained eye in not purely functional languages like JavaScript but being formatted with `prettier`, I think, it is quite comprehensible.
- No dependency on any webpack-like bundler or transpiler for development. I wanted to try out this approach which has its advantages and drawbacks outside of the scope of this document, and, I think, it worked out well.
- Instead of using one of many ready-made libraries for managing a store I tried to implement [Meiosis](http://meiosis.js.org/) pattern which took just [few lines](https://github.com/sgtpep/exchange-widget/blob/master/src/stream.js) of code and a dependency on any reactive programming library supporting streams (I used [Kefir.js](https://kefirjs.github.io/kefir/)).
- Without a transpilation it's possible to have JSX-like experience using HTML tagged templates, and I used [htm](https://github.com/developit/htm) for that (implemented by the developer of Preact).

## Tested Browsers

- Chromium 71
- Firefox 60.5.0esr
- Opera 58
- Google Chrome for Android 71
- Safari 10.1.2
- Edge 42

Unfortunately, I didn't have an opportunity to test in Safari on iOS and the latest Safari on macOS.
