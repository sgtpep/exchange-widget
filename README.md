# Exchange Widget

[![Build Status](https://travis-ci.org/sgtpep/exchange-widget.svg?branch=master)](https://travis-ci.org/sgtpep/exchange-widget)

The currency exchange widget inspired by a popular mobile app. Demo: https://sgtpep.github.io/exchange-widget/dist/.

## Development

This project doesn't require bundlers like `webpack` for development and consists entirily of browser-native ES modules and stylesheets which can be served as static files by any http server.

From a project directory run `npm install` and then `npm start` to start such an http server on `http://localhost:8000/`. Edit files and refresh the page in the browser to see the result.

## NPM Scripts

- `build`: Generates the production code by combining, transpiling and minimizing of styles and scripts.
- `start`: Starts the development web server for serving static content on `http://localhost:8000/`.
- `test`: Checks code formatting, checks for linting errors, runs tests.

## Tested Browsers

- Chromium 71
- Firefox 60.5.0esr
- Opera 58
- Google Chrome for Android 71
- Safari 10.1.2
- Edge 42

Unfortunately, I didn't have an opportunity to test in Safari on iOS and the latest Safari on macOS.
