const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer');
        // rename = require('gulp-rename'),
        // imagemin = require('gulp-imagemin'),
        // eslint = require('gulp-eslint'),
        // merge = require('merge-stream'),
        // concat = require('gulp-concat'),
        // uglify = require('gulp-uglify'),
        // order = require('gulp-order');

var src = 'src/',
    build = 'build/';

function style() {
    return (gulp.src(src + 'scss/*.scss'))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            // browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(build + 'css/'));
}

exports.style = style;
