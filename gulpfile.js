// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./public/components/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['./public/QueueApp.js' ,'./public/components/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./public/components/**/*.js', ['lint', 'scripts']);
    gulp.watch('./sass/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);