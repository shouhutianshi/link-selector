var postcss = require('gulp-postcss')
var sass = require('gulp-sass')
var gulp = require('gulp')
var csso = require('gulp-csso')
var imagemin = require('gulp-imagemin')
var useref = require('gulp-useref')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

gulp.task('css', function () {
  return gulp.src('./css/main.css')
    .pipe(sass())
    .pipe(postcss())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
})

// 图片处理
gulp.task('images', function () {
  return gulp.src('./img/*')
    .pipe(gulp.dest('dist/img'))
})

// js处理
gulp.task('js', function () {
  return gulp.src('./js/*')
    .pipe(gulp.dest('dist/js'))
})

// 页面处理
gulp.task('html', function () {
  return gulp.src('./*.html')
    .pipe(gulp.dest('dist'))
})

// 兼顾性能，传入单一的监听文件
// var html = 'setting.html'

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['html', 'js'], function () {
  browserSync.init({
    server: "./dist/"
  })

  gulp.watch("./*.html", ['html', 'css', 'js']).on('change', reload)
})