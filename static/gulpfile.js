var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require("browser-sync").create();
var revCollector = require("gulp-rev-collector");
var streamify = require("gulp-streamify");
var minifyCss = require("gulp-minify-css");
var babelify = require("babelify");
var reactify = require("reactify");
var cssnano = require("gulp-cssnano");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var stylus = require("gulp-stylus");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var rev = require("gulp-rev");
var path = {
  app: "src/app.js",
  javascript: "src/**/*.js",
  css: "style/**/*.styl",
};
var jspath = [
  "assets/vendor/js/jquery.min.js",
  "assets/vendor/js/bootstrap.min.js",
  "assets/vendor/js/ellipsis.min.js",
];
var csspath = [
  "assets/vendor/css/fontawesome.min.css",
  "assets/vendor/css/bootstrap.min.css",
  "assets/vendor/css/bootstrap.theme.min.css",
];
var tasks = [
  "build-vendors-js",
  "build-vendors-css",
  "build-js",
  "build-css",
  "watch-js"
];

gulp.task("build-vendors-js", function() {
  gulp.src(jspath)
    .pipe(concat("vendor.min.js"))
    .pipe(gulp.dest("./js"));
});

gulp.task("build-vendors-css", function() {
  gulp.src(csspath)
    .pipe(concat("vendor.min.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest("./css"));
});

gulp.task("serve", tasks, function(){
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