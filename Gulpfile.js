var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs-extra');

gulp.task('bootstrap', function() {
    fs.copySync('node_modules/bootstrap/dist/js/bootstrap.js',
        'public/assets/bootstrap.js', { clobber: true });

    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.css'
    ]).pipe(concat('bootstrap.css'))
      .pipe(gulp.dest('public/assets'));
});