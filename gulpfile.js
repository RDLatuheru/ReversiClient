const {series} = require('gulp'), gulp = require('gulp'), concat = require('gulp-concat'), uglify = require('gulp-uglify');

function concatJS(){
    return gulp.src([
        'src/js/Game.Data.js',
        'src/js/Game.Model.js',
        'src/js/Game.Reversi.js',
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
}


function defaultTask(cb) {
    // place code for your default task here
    cb();
    console.log("default task succesful")
}

function concatFiles(cb){
    gulp.src("src/js/*.js").pipe(concat("scripts.js")).pipe(gulp.dest("dist/"))
    cb();
}

const gulpSass = require('gulp-sass')(require('sass'));

function sass(cb){
    gulp.src("src/css/*.scss")
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(concat("style.css"))
        .pipe(gulp.dest('dist/'));
    cb();
}

exports.sass = sass;

exports.concatFiles = concatFiles;

exports.default = series(defaultTask);