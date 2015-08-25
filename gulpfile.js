var gulp = require('gulp'),
  inject = require('gulp-inject'),
  connect = require('gulp-connect'),
// Include Our Plugins
  // rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify");
  mainBowerFiles = require('gulp-main-bower-files'),
  sourcemaps = require('gulp-sourcemaps'),
  rev = require('gulp-rev'),
  del = require("del"),
  gutil = require('gulp-util'),
  using = require('gulp-using'),
  inject = require('gulp-inject');
//---------------------------------------------

var paths = {
  webroot: './',
  appJs: ['./src/app/**/*.js', '!./src/app/**/*.spec.js']
};


//-----------CLEAN--------------------
gulp.task("clean:js", function(cb) {
  // rimraf(paths.concatJsDest, cb);
  return del([paths.webroot + 'dist/**/*.min.js'], cb);
});
gulp.task("clean", ["clean:js"]);


//-----------MIN--------------------
gulp.task('min:js', function(){
  //min app
  gulp.src(paths.appJs)
    //.pipe(sourcemaps.init())
    .pipe(concat({path: 'app.min.js', cwd: ''}))                     // Make a single file 
    .pipe(using())
    .pipe(uglify())                                 // Make the file titchy tiny small
    .pipe(rev())                                    // Suffix a version number to it
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot +'dist/js/'))    // Write single versioned file to build/release folder
    .on('error', gutil.log);

    gulp.src('./bower.json')
        .pipe(using())
        // .pipe(sourcemaps.init())
        .pipe(mainBowerFiles('**/*.js'))
        .pipe(concat({path: 'vendor.min.js', cwd: ''}))                     // Make a single file 
        .pipe(uglify())                                 // Make the file titchy tiny small
        .pipe(rev())                                    // Suffix a version number to it
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.webroot +'dist/js/'))   // Write single versioned file to build/release folder
        .on('error', gutil.log); 
});

gulp.task('min', ['clean', 'min:js']);

gulp.task('build:dev', function () {
  setTimeout(function(){
    gulp.src('src/index.html')
    //.pipe(inject(gulp.src(paths.webroot +'dist/app/*.min.js', {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    // .pipe(inject(gulp.src(paths.webroot +'dist/js/*.min.js', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest('.'));
  }, 2000);
});

gulp.task('html:release', ['clean', 'min'], function () {
    gulp.src(paths.webroot + 'src/index.html')
    .pipe(using())
    .pipe(inject(gulp.src(paths.webroot +'dist/app*.min.js', {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.webroot +'dist/vendor*.min.js', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest(paths.webroot));
});

gulp.task('connect', ['clean', 'min', 'html:release'], function() {
  connect.server({
    root: '.',
    livereload: true,
    port: 8080,
    host: 'fe.youlook.net'
  });
});


// Start the tasks
gulp.task('default', ['clean', 'min', 'html:release', 'connect']);