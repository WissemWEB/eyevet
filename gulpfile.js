var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    eslint = require('gulp-eslint'),
    merge = require('merge-stream'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order');

var src = 'src/',
    build = 'build/';

gulp.task('sass', function() {
    return gulp.src(src + 'scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(build + 'css/'));
});

gulp.task('imagemin', function() {
    return gulp.src(src + 'images/*')
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true
        }))
        .pipe(gulp.dest(build + 'images/'));
});


gulp.task('iconmin', function() {
    return gulp.src(src + 'icons/*')
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true
        }))
        .pipe(gulp.dest(build + 'icons/'));
});

gulp.task('eslint', function() {
    return gulp.src(src + 'js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('scripts', function() {
    return gulp.src(src + 'js/*.js')
        .pipe(order(['modernizr.js','main.js']))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(build + 'js/'));
});


gulp.task('watch', function() {
    gulp.watch(src + 'scss/*.scss', ['sass']);
    gulp.watch(src + 'images/*', ['imagemin']);
    gulp.watch(src + 'js/*.js', ['eslint', 'scripts']);
    gulp.watch(src + 'icons/*', ['iconmin']);
});

gulp.task('default', ['sass', 'imagemin', 'iconmin', 'scripts', 'eslint', 'watch']);

