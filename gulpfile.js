var gulp = require('gulp'),
  inject = require('gulp-inject'),
  connect = require('gulp-connect');
// Include Our Plugins
  // rimraf = require("rimraf"),
  // concat = require("gulp-concat"),
  // cssmin = require("gulp-cssmin"),
  // uglify = require("gulp-uglify");


gulp.task('connect', ['index:dev'], function() {
  connect.server({
    root: '.',
    livereload: true,
    port: 80,
    host: 'fe.youlook.net'
  });
});

gulp.task('index:dev', function () {
  setTimeout(function(){
    gulp.src('src/index.html')
    //.pipe(inject(gulp.src(paths.webroot +'dist/app/*.min.js', {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    // .pipe(inject(gulp.src(paths.webroot +'dist/vendor/*.min.js', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest('.'));
  }, 2000);
});

// Start the tasks
gulp.task('default', ['index:dev', 'connect']);