var gulp = require('gulp'),
    plumber = require('gulp-plumber');

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  return gulp.src('public/js/app/**/*.js')
    .pipe(plumber())
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('public/docs/'));
});

gulp.task('watch-ngdocs', [], function() {
   gulp.watch('public/**/*.js', ['ngdocs'])
})
