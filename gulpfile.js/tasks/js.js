//Modules
const {series} = require('gulp'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpSass = require('gulp-sass')(require('sass')),
    order = require('gulp-order'),
    babel = require('gulp-babel')


//Tasks
function orderAndWriteJs(filesJs, filesJsOrder, backendPath){
    return function() {
        return gulp.src(filesJs)
            .pipe(order(filesJsOrder, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(gulp.dest('dist/js'))
            .pipe(gulp.dest(backendPath + '/js'));
    }
}
exports.orderAndWriteJs = orderAndWriteJs


function fn (backendPath) {
    return function () {
        return gulp.src('src/js/*.js')
            .pipe(gulp.dest('dist'))
            .pipe(gulp.dest(backendPath));
    }
}
exports.js = fn;

function defaultTask(cb) {
    // place code for your default task here
    console.log("default task succesful")
    cb();
}
exports.task = series(defaultTask);

function concatFiles(cb){
    gulp.src(["src/js/Game.Data.js", "src/js/Game.Reversi.js", "src/js/Game.Model.js", "src/js/Game.Data.js"])
        .pipe(concat("scripts.js"))
        //.pipe(minify())
        .pipe(uglify())
        .pipe(gulp.dest("dest"))
    cb();
}
exports.concatFiles = concatFiles;

function sass(cb){
    gulp.src("src/css/*.scss")
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(concat("style.css"))
        .pipe(gulp.dest('dist/'));
    cb();
}
exports.sass = sass;

gulp.task('showMessage', function (cb){
    console.log("hello World");
    cb();
})
exports.showMessage = "showMessage"