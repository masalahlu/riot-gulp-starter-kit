var gulp = require('gulp');
var riot = require('gulp-riot');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
var gulpCopy = require('gulp-copy');
var gutil = require('gulp-util'); //handling error

// gulp.task('copy-file',function(){
// 	return gulp.src([
// 		'public/assets/admin/basic/css/bootstrap.min.css',
// 		'public/assets/admin/basic/css/oneui.css'
// 	])
//     .pipe(gulpCopy('./public/assets/admin/basic/css/'))
//     .pipe(gulp.dest('public/dist/css'))
// })

gulp.task('riot', function(){
	return gulp.src('resource/riot/**/*.tag')
	.pipe(concat('app.riot.js'))
	.pipe(riot())
	.pipe(gulp.dest('resource/js'))
});

gulp.task('scripts', ['riot'], function(){
	return gulp.src([
		'node_modules/riot/riot.min.js',
		'node_modules/riot/dist/route.min.js',
		'resource/js/app.riot.js',
		'resource/js/app.js'
		])
	.pipe(concat('app.min.js'))
	.pipe(uglify().on('error', gutil.log))
	.pipe(gulp.dest('public/dist/js'))
});

gulp.task('css', function(){
	return gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.min.css',
	])
	.pipe(concat('app.min.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest('./public/dist/css'))
});

gulp.task('hello', function() {
  console.log('Pingot Ganteng');
});

gulp.task('watch', function(){
	gulp.watch(['resource/riot/**/*.tag','resource/js/**/*.js'],['scripts','css'])
});