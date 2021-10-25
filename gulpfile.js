var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "app"
    });

    gulp.watch("app/scss/*.scss", gulp.parallel('sass'));
    gulp.watch("app/*.html").on('change', () => {
        browserSync.reload();
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    var processors = [autoprefixer, cssnext, precss];
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(postcss([postcssImport()]))
        .pipe(postcss([ autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        })]))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('serve'));
