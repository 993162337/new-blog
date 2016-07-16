var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task("compress", function() {
  gulp.src("_dev/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("_production"));
})
