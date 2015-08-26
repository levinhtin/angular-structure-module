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
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  gutil = require('gulp-util'),
  using = require('gulp-using'),
  inject = require('gulp-inject');
//---------------------------------------------

var paths = {
  webroot: './',
  appJs: ['./src/app/**/*.module.js',
          './src/app/**/*.js',
          '!./src/app/**/*.spec.js']
};


//-----------CLEAN--------------------
gulp.task('clean:js', function() {
  // del([paths.webroot + 'dist/js/*.js'],cb);
  // del([paths.webroot + 'dist/'],cb);
  return gulp.src([paths.webroot + 'dist/js/*.js'])
          .pipe(clean());
});
gulp.task('clean', ['clean:js']);

//-----------CONCAT-----------------
gulp.task('concat:js:app', function(){
  return gulp.src(paths.appJs)
    .pipe(using())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat({path: 'app.min.js', cwd: ''}))                     // Make a single file 
    .pipe(rev())                                    // Suffix a version number to it
    .pipe(gulp.dest(paths.webroot +'dist/js/'))    // Write single versioned file to build/release folder
    .on('error', gutil.log);
});
gulp.task('concat:js:vendor', function(){
  return gulp.src('./bower.json')
    .pipe(using())
    // .pipe(sourcemaps.init())
    .pipe(mainBowerFiles('**/*.js'))
    .pipe(concat({path: 'vendor.min.js', cwd: ''}))                     // Make a single file 
    .pipe(rev())                                    // Suffix a version number to it
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot +'dist/js/'))   // Write single versioned file to build/release folder
    .on('error', gutil.log); 
});

gulp.task('concat:js', ['clean:js', 'concat:js:vendor', 'concat:js:app']);
gulp.task('concat', ['clean', 'concat:js']);

//-----------MIN--------------------
gulp.task('min:js:app', function(){
  //min app
  return gulp.src(paths.appJs)
    //.pipe(sourcemaps.init())
    .pipe(using())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat({path: 'app.min.js', cwd: ''}))                     // Make a single file 
    .pipe(uglify())                                 // Make the file titchy tiny small
    .pipe(rev())                                    // Suffix a version number to it
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot +'dist/js/'))    // Write single versioned file to build/release folder
    .on('error', gutil.log);
});

gulp.task('min:js:vendor', function(){
  return gulp.src('./bower.json')
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

gulp.task('min:js', ['clean:js', 'min:js:vendor', 'min:js:app']);

gulp.task('min', ['min:js']);

//----------------HTML---------------------------
gulp.task('html:debug', ['concat'], function () {
    gulp.src(paths.webroot + 'src/index.html')
    .pipe(using())
    .pipe(inject(gulp.src(paths.webroot +'dist/**/app*.min.js', {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.webroot +'dist/**/vendor*.min.js', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest(paths.webroot));  
});

gulp.task('html:release', ['min'], function () {
    gulp.src(paths.webroot + 'src/index.html')
    .pipe(using())
    .pipe(inject(gulp.src(paths.webroot +'dist/**/app*.min.js', {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.webroot +'dist/**/vendor*.min.js', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest(paths.webroot));  
});
//-----------------SERVER-----------------------------------
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true,
    port: 8080,
    host: 'fe.youlook.net'
  });
});
//-----------------RUN--------------------------------
gulp.task('debug', ['html:debug', 'connect']);
gulp.task('release', ['html:release', 'connect']);

// Start the tasks
//gulp.task('default', ['connect']);