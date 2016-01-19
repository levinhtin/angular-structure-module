var gulp = require('gulp'),
  connect = require('gulp-connect'),
// Include Our Plugins
  // rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  minifyCss = require('gulp-minify-css'),
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
var plug = require('gulp-load-plugins')();
var karma = require('karma').Server;
var env = plug.util.env;
var stylish = require('jshint-stylish');
var eslint = require('gulp-eslint');
//---------------------------------------------

var paths = {
  webroot: './',
  appJs: ['./src/app/**/*.module.js',
          './src/app/**/*.provider.js',
          './src/app/**/*.sevice.js',
          './src/app/**/*.factory.js',
          './src/app/core/core.constants.js',
          './src/app/core/core.config.js',
          './src/app/core/core.run.js',

          './src/app/**/*.route.js',
          './src/app/**/*.controller.js',
          '!./src/app/**/*.spec.js'],
  appCss: ['src/styles/styles.css'],
  vendorCss: ['bower_components/bootstrap/dist/css/bootstrap.css',
              'bower_components/font-awesome/css/font-awesome.css',
              'bower_components/toastr/toastr.css',
              'bower_components/ngDialog/css/ngDialog.css',
              'bower_components/ngDialog/css/ngDialog-theme-default.css'],
  vendorFont: ['bower_components/font-awesome/fonts/*',
               'bower_components/bootstrap/dist/fonts/*']
};


gulp.task('jshint', function(){
   return gulp.src(paths.appJs)
    .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('eslint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['./src/app/**/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


gulp.task('test', function(done) {
    startTests(true /*singleRun*/ , done);
  // new karma({
  //     configFile: __dirname + '/karma.conf.js',
  //     singleRun: true
  // }, done).start();
});

/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    var child;
    var excludeFiles = ['./src/app/**/*spaghetti.js'];
    var fork = require('child_process').fork;

    // if (env.startServers) {
    //     log('Starting servers');
    //     var savedEnv = process.env;
    //     savedEnv.NODE_ENV = 'dev';
    //     savedEnv.PORT = 8888;
    //     child = fork('src/server/app.js', childProcessCompleted);
    // } else {
    // }
        excludeFiles.push('./src/test/midway/**/*.spec.js');
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    ////////////////

    function childProcessCompleted(error, stdout, stderr) {
        log('stdout: ' + stdout);
        log('stderr: ' + stderr);
        if (error !== null) {
            log('exec error: ' + error);
        }
    }

    function karmaCompleted() {
        if (child) {
            child.kill();
        }
        done();
    }
}


//-----------CLEAN--------------------
gulp.task('clean:js', function() {
  // del([paths.webroot + 'dist/js/*.js'],cb);
  // del([paths.webroot + 'dist/'],cb);
  return gulp.src([paths.webroot + 'dist/js/*.js', paths.webroot + 'dist/js/*.map'])
          .pipe(clean());
});
gulp.task('clean:css', function() {
  // del([paths.webroot + 'dist/js/*.js'],cb);
  // del([paths.webroot + 'dist/'],cb);
  return gulp.src([paths.webroot + 'dist/css/**'])
          .pipe(clean());
});
gulp.task('clean', ['clean:js', 'clean:css']);

//-----------JSHINT-----------------
gulp.task('jshint:app', function(){
  //min app
  return gulp.src(paths.appJs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

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
    .pipe(sourcemaps.init())
    .pipe(using())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat({path: 'app.min.js', cwd: ''}))                     // Make a single file
    .pipe(uglify())                                 // Make the file titchy tiny small
    .pipe(rev())                                    // Suffix a version number to it
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot +'dist/js/'))    // Write single versioned file to build/release folder
    .on('error', gutil.log);
});

gulp.task('min:js:vendor', function(){
  return gulp.src('./bower.json')
    .pipe(using())
    .pipe(sourcemaps.init())
    .pipe(mainBowerFiles('**/*.js'))
    .pipe(concat({path: 'vendor.min.js', cwd: ''}))                     // Make a single file
    .pipe(uglify())                                 // Make the file titchy tiny small
    .pipe(rev())                                    // Suffix a version number to it
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot +'dist/js/'))   // Write single versioned file to build/release folder
    .on('error', gutil.log);
});

gulp.task('min:js', ['clean:js', 'min:js:vendor', 'min:js:app']);
//--------------------------------------------------------------
gulp.task('min:css:vendor', function(){
  return gulp.src(paths.vendorCss)
    .pipe(using())
    .pipe(concat({path: 'vendor.min.css', cwd: ''}))                     // Make a single file
    .pipe(minifyCss())                                 // Make the file titchy tiny small
    .pipe(rev())                                    // Suffix a version number to it
    .pipe(gulp.dest(paths.webroot +'dist/css/'))   // Write single versioned file to build/release folder
    .on('error', gutil.log);
});
gulp.task('min:css', ['clean:css', 'min:css:vendor']);
gulp.task('min', ['min:js', 'min:css']);

//--------------------------------------------------------------


//----------------HTML---------------------------
gulp.task('html:dev', function () {
  // var bowerStream = gulp.src('./bower.json').pipe(mainBowerFiles( ));
  // console.log(bowerStream);
    gulp.src(paths.webroot + 'src/index.html')
    .pipe(using())
    .pipe(inject(gulp.src(paths.appJs, {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(inject(gulp.src('./bower.json', {read:true}).pipe(mainBowerFiles()), {relative: true, starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.appCss, {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.vendorCss, {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest(paths.webroot));

});

gulp.task('html:debug', ['concat'], function () {
    return gulp.src(paths.webroot + 'src/index.html')
    .pipe(using())
    .pipe(inject(gulp.src(paths.webroot +'dist/**/app*.min.js', {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.webroot +'dist/**/vendor*.min.js', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.vendorCss, {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest(paths.webroot));
});

gulp.task('html:release', ['min'], function () {
    return gulp.src(paths.webroot + 'src/index.html')
    .pipe(using())
    .pipe(inject(gulp.src(paths.webroot +'dist/js/app*.min.js', {read: false}), {starttag: '<!-- inject:app:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.webroot +'dist/js/vendor*.min.js', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(inject(gulp.src(paths.webroot +'dist/css/vendor*.min.css', {read: false}), {starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(gulp.dest(paths.webroot));
});
//-----------------SERVER-----------------------------------
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true,
    port: 8080,
    host: 'localhost'
  });
});
//-----------------RUN--------------------------------
gulp.task('dev', ['html:dev', 'connect']);
gulp.task('debug', ['html:debug', 'connect']);
gulp.task('release', ['html:release', 'connect']);

// Start the tasks
//gulp.task('default', ['connect']);
