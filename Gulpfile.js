var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs-extra');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('bootstrap', function() {
    fs.copySync('node_modules/bootstrap/dist/js/bootstrap.js',
        'public/assets/bootstrap.js', { clobber: true });

    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.css'
    ]).pipe(concat('bootstrap.css'))
      .pipe(gulp.dest('public/assets'));
});

gulp.task('scripts', function() {
    var bundler = browserify({
      entries: ['./sirius/assets/javascripts/main.js'],
      debug: true,
      transform: [babelify, reactify],
      cache: {}, packageCache: {}, fullPaths: true
    }).on('error', function(err) {
      console.log('ERROR: '+ err.message);
    });
    
    var watcher = watchify(bundler);
    
    watcher.on('update', function() {
      var time = Date.now();
      watcher.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/assets'));
        console.log('Bundle done.', (Date.now() - time) + 'ms');
    }).bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/assets'));
      
    return watcher;
});