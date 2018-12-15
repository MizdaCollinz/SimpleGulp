/* eslint-env gulp */

let gulp = require("gulp");
const eslint = require("gulp-eslint");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("default", ["styles","lint"], function() {
    gulp.watch("sass/**/*.scss", ["styles"]);
    gulp.watch("js/**/*.js", ["lint"]);
    browserSync.init({
        server: "./"
    });
    
});

//Generate CSS from SCSS
gulp.task("styles", function() {
    gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
        autoprefixer({
            browsers: ["last 2 versions"]
        })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

//Lint the JS scripts
gulp.task("lint", function() {
    return gulp.src(['js/*.js'])
    //Attach lint output to eslint property of file object
    .pipe(eslint())
    // Output lint results to console
    .pipe(eslint.format())
    // Update process exit code if lint errors
    .pipe(eslint.failAfterError());
});

//Generate a built version of javascript
gulp.task("scripts", function() {
    gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/'));
});