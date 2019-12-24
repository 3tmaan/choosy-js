const { src, dest, parallel } = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

const sources = {
  input: './src/',
  output: './dist/'
}

function js() {
  return src(`${sources.input}*.js`)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest(sources.output))
}

function css() {
  return src(`${sources.input}*.css`)
    .pipe(postcss())
    .pipe(cleanCSS())
    .pipe(dest(sources.output))
}

function copy() {
  return src(`${sources.input}*.svg`)
    .pipe(dest(sources.output));
}

exports.css = css;
exports.js = js;
exports.copy = copy;
exports.default = parallel(js, css, copy);