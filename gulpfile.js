'use strict';

const gulp = require('gulp');
const exec = require('child_process').execSync;
const browserSync = require('browser-sync').create();

const paths = {
  dotLatex: ['src/resume.tex', 'sections/*.tex', 'src/resume.cls']
};

// BUG: if not wrapped in anonymous function,
// browserSync will only be run on first attempt.
gulp.task('tex-watch', ['tex'], () => {
  browserSync.reload();
});

gulp.task('tex', () => {
  try {
    exec('make');
  } catch(err) {
    console.log(err);
  }
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('index.html', browserSync.reload);
  gulp.watch(paths.dotLatex, ['tex-watch']);
});
