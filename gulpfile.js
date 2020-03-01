const   gulp        = require('gulp'),
        pug         = require('gulp-pug'),
        plumber     = require('gulp-plumber'),
        clean       = require('gulp-clean'),
        sass       = require('gulp-sass'),
        browserSync = require('browser-sync').create();


clear = async function clear()  {
    return gulp.src(['public/'])
        .pipe(clean());
};


pugRun = async function pugRun() {
    return gulp.src(['dev/**/*.pug','!dev/**/_mixins.pug'])
      .pipe(plumber())
      .pipe(pug({
        pretty: true,
        basedir: '/',
        verbose: true
      }))
      .pipe(gulp.dest('./public/'));
};

pugWatch = async function pugWatch() {
    let watcherPug = gulp.watch('dev/**/*.pug');

    watcherPug.on('change', function () {
        pugRun()
    });
};

sassRun = async function sassRun() {
    return gulp.src('dev/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./public/'))

};

sassWatch = async function sassWatch() {
  let watcherPug = gulp.watch('dev/**/*.scss');

  watcherPug.on('change', function () {
      sassRun()
  });
};

jsRun = async function jsRun() {
  return gulp.src('dev/**/*.js')
      .pipe(gulp.dest('./public/'))

};

jsWatch  = async function jsWatch() {
  let watcherJS = gulp.watch('dev/**/*.js');

  watcherJS.on('change', function () {
      jsRun()
  });
};

const initBrowserSync = () => {
  browserSync.init({
    server: {
      baseDir: './public/',
    },
    notify: false,
    files: [
      './**/*.*'
    ]
  });
};

serverui = async function server()  {
  initBrowserSync();
};

const build = gulp.series(


    pugRun,
    sassRun,
    jsRun

)

const watch = gulp.series(
  pugWatch,
  sassWatch,
  jsWatch,
  serverui
);

const buildDev = gulp.series(
    build,
    watch
);

// ======================
gulp.task('start', buildDev);
gulp.task('build', build);
gulp.task('clear', clear);
