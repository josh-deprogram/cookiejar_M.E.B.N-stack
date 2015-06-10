var gulp = require('gulp');

// gulp.task('build', []);
gulp.task('build', ['compass', 'images', 'markup', 'scripts', 'templates']);
