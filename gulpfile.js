var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber');

//Folders
var src = 'src',
    tmp = 'tmp',
    build = 'build';

//Dev task
gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: tmp
      }
  });
});

gulp.task('fonts', function() {
  gulp.src(src + '/fonts/**/*')
  .pipe(gulp.dest(tmp + '/fonts'))
  .pipe(reload({stream:true}));
});

gulp.task('images', function() {
  gulp.src(src + '/images/**/*')
  .pipe(gulp.dest(tmp + '/images'))
  .pipe(reload({stream:true}));
});

gulp.task('uglify', function() {
  gulp.src(src + '/scripts/**/*')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest(tmp + '/scripts'))
  .pipe(reload({stream:true}));
});

gulp.task('sass', function(){
  gulp.src(src + '/styles/style.scss')
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer('last 15 version'))
  .pipe(gulp.dest(tmp + '/styles'))
  .pipe(reload({stream:true}));
  });

gulp.task('pug', function(){
  gulp.src([src + '/pug/**/*.pug', '!./' + src + '/pug/template/**/*'])
  .pipe(plumber())
  .pipe(pug())
  .pipe(gulp.dest(tmp + ''))
  .pipe(reload({stream:true}));
});

gulp.task('default', ['sass', 'pug', 'browser-sync', 'images', 'fonts', 'uglify'], function () {
  gulp.watch(src + '/styles/**/*.scss', ['sass']),
  gulp.watch(src + '/pug/**/*.pug', ['pug']),
  gulp.watch(src + '/images/**/*', ['images']),
  gulp.watch(src + '/fonts/**/*', ['fonts']),
  gulp.watch(src + '/scripts/**/*', ['uglify']);
});

//Build task
gulp.task('clean', function() {
  del(build);
});

gulp.task('fonts:build', function() {
  gulp.src(src + '/fonts/**/*')
  .pipe(gulp.dest(build + '/fonts'));
});

gulp.task('uglify:build', function() {
  gulp.src(src + '/scripts/**/*')
  .pipe(uglify())
  .pipe(gulp.dest(build + '/scripts'));
});

gulp.task('imagemin', function(){
  gulp.src(src + '/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest(build + '/images'));
});

gulp.task('sass:build', function(){
  gulp.src(src + '/styles/style.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer('last 15 version'))
  .pipe(gulp.dest(build + '/styles'));
  });

gulp.task('pug:build', function(){
  gulp.src([src + '/pug/**/*.pug', '!./' + src + '/pug/template/**/*'])
  .pipe(pug())
  .pipe(gulp.dest(build));
});

gulp.task('build', function (callback) {
  runSequence('clean',
    ['sass:build', 'uglify:build', 'pug:build', 'imagemin', 'fonts:build'],
    callback
  )
});
