//gulpfile.js/index.js
// const { src, dest } = require('gulp');
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

// exports.build = series(concatJS);
exports.default = series(defaultTask, concatJS);