const gulp = require('gulp');

//for styles
const sass = require('gulp-sass');
const groupMediaQuaeries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const sourcemaps = require('gulp-sourcemaps');

//for scripts
const concat = require('gulp-concat');    //собирает все файлы js в один
const uglify = require('gulp-uglify');    //минифицирует js
const babel = require('gulp-babel');      //переводит в старый синтаксис js

const rename = require('gulp-rename');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');


/* ------ Конфигурация и настройка сборки  -------- */
const isDevelopment = false;


const paths = {
    src: './src/',      //paths.src
    build: './build/'     //paths.build
};

function htmls() {
    return gulp.src(paths.src + '*.html')
        .pipe(plumber())
        .pipe(gulp.dest(paths.build))
}

function fonts() {
    return gulp.src(paths.src + 'fonts/**/*.{woff,woff2}')
        .pipe(gulp.dest(paths.build + 'fonts/'))
}

function images() {
    return gulp.src(paths.src + 'img/**/*.{jpg,jpeg,png,gif,svg}')
      .pipe(gulp.dest(paths.build + 'img/'))
}

function styles() {
    return gulp.src(paths.src + 'scss/main.scss')
        .pipe(plumber())
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(groupMediaQuaeries())
        .pipe(postcss([
            autoprefixer({browsers: ['last 2 versions']}),
            pxtorem({
                propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
                replace: true,
                mediaQuery: true
            })

        ]))
        .pipe(gulpIf(!isDevelopment, cleanCSS()))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulpIf(isDevelopment, sourcemaps.write('maps')))
        .pipe(gulp.dest(paths.build + 'css/'))
}

function scripts() {
    return gulp.src(paths.src + 'js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(paths.build + 'js/'))
}

function clean() {
    return del('build/')
}

function watcher() {
    gulp.watch(paths.src + '*.html', htmls);
    gulp.watch(paths.src + 'scss/**/*.scss', styles);
    gulp.watch(paths.src + 'img/**/*.{jpg,jpeg,png,svg}', images);
    gulp.watch(paths.src + 'js/*.js', scripts);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}


exports.htmls = htmls;
exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watcher = watcher;
exports.clean = clean;
exports.serve = serve;


exports.build = gulp.series(
    clean,
    gulp.parallel(htmls, fonts, images, styles, scripts)
);

exports.default = gulp.series(
    clean,
    gulp.parallel(htmls, fonts, images, styles, scripts),
    gulp.parallel(watcher, serve)
);