var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var browserSync = require("browser-sync").create();
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");
var reactify = require("reactify");
var buffer = require("vinyl-buffer");
var stylus = require("gulp-stylus");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var path = {
  app: "src/app.js",
  javascript: "src/**/*.js",
  css: "style/**/*.styl",
};

gulp.task("serve", ["build-css", "build-js", "watch-js"], function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(path.javascript, ["watch-js"]);
  gulp.watch(path.css, ["watch-css"]);
});

gulp.task("watch-js", ["build-js"], function(){
  gulp.src(path.app)
    .pipe(browserSync.stream());
});

gulp.task("watch-css", ["build-css"], function(){
  gulp.src(path.css)
    .pipe(browserSync.stream());
});

gulp.task("build-css", function(){
  gulp.src(path.css)
    .pipe(stylus())
    .pipe(cssnano())
    .pipe(gulp.dest("css"))
});

gulp.task("build-js", function(){
  return browserify(path.app)
    .transform(babelify)
    .transform(reactify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('js'))

});

gulp.task("default", ["serve"]);